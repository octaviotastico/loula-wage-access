import { isValidEmployeeId } from "../commons/sanitization.js";
import db from "../config/db.js";

export const checkAdvanceAvailable = async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidEmployeeId(employeeId)) {
    return res.status(400).send("Invalid employee ID");
  }

  try {
    const { rows } = await db.query(`
      SELECT
        e.monthly_salary,
        e.salary_currency,
        e.monthly_salary - COALESCE(
          SUM(t.amount / CASE WHEN t.currency = e.salary_currency THEN 1 ELSE cr.rate END),
          0
        ) AS available_advance
      FROM
        employees e
      LEFT JOIN
        transactions t ON e.employee_id = t.employee_id
        AND t.type = 'wage_advance'
        AND EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND EXTRACT(MONTH FROM t.transaction_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      LEFT JOIN
        currency_rates cr ON (t.currency || '_' || e.salary_currency) = cr.pair
      WHERE
        e.employee_id = $1
      GROUP BY
        e.employee_id, e.monthly_salary, e.salary_currency;
    `, [employeeId]);

    if (rows.length > 0) {
      const { available_advance, salary_currency } = rows[0];
      res.json({
        availableAdvance: Math.max(available_advance, 0), // Ensure non-negative availability
        currency: salary_currency
      });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error('Error calculating available advance:', error);
    res.status(500).send('Server error');
  }
};

export const getRequestedAdvances = async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidEmployeeId(employeeId)) {
    return res.status(400).send("Invalid employee ID");
  }

  try {
    const { rows } = await db.query(`
      SELECT
        t.transaction_id,
        t.amount,
        t.currency,
        t.description,
        t.transaction_date
      FROM
        transactions t
      WHERE
        t.employee_id = $1
      AND
        t.type = 'wage_advance'
      AND
        EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM CURRENT_DATE)
      AND
        EXTRACT(MONTH FROM t.transaction_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      ORDER BY
        t.transaction_date DESC;
    `, [employeeId]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching employee transactions:", error);
    res.status(500).send("Server error");
  }
}

export const requestAdvance = async (req, res) => {
  const { employeeId } = req.params;
  const { advanceAmount, currency } = req.body;

  try {
    // First, check available advance
    const available = await db.query(`
      SELECT (e.monthly_salary - COALESCE(SUM(t.amount), 0)) AS available_advance
      FROM employees e
      LEFT JOIN transactions t ON e.employee_id = t.employee_id AND t.type = 'wage_advance'
        AND t.currency = $2
        AND EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM CURRENT_DATE)
        AND EXTRACT(MONTH FROM t.transaction_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      WHERE e.employee_id = $1
      GROUP BY e.monthly_salary;
    `, [employeeId, currency]);

    if (available.rows.length === 0) {
      return res.status(404).send("Employee not found or no salary information available");
    }

    // Convert available_advance to a number for proper comparison
    const available_advance = Number(available.rows[0].available_advance);

    // Check for positive advanceAmount and within available limit
    if (advanceAmount > 0 && advanceAmount <= available_advance) {
      // Process the advance
      const client = await db.connect();
      try {
        await client.query('BEGIN');

        const insertTransaction = `
          INSERT INTO transactions (employee_id, type, amount, currency, description, transaction_date)
          VALUES ($1, 'wage_advance', $2, $3, 'Wage advance', CURRENT_TIMESTAMP);
        `;
        await client.query(insertTransaction, [employeeId, Number(advanceAmount), currency]);

        const updateBalance = `
          UPDATE employee_balances
          SET balance = balance + $2
          WHERE employee_id = $1 AND currency = $3;
        `;
        await client.query(updateBalance, [employeeId, Number(advanceAmount), currency]);

        await client.query('COMMIT');
        res.send({ message: "Advance processed successfully", advancedAmount: advanceAmount, currency: currency });
      } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error during transaction:", error);
        res.status(500).send("Error during transaction");
      } finally {
        client.release();
      }
    } else {
      res.status(400).send("Invalid advance amount requested or exceeds available advance");
    }
  } catch (error) {
    console.error("Error processing wage advance:", error);
    res.status(500).send("Server error");
  }
};

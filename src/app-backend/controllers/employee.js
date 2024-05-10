import { isValidEmployeeId } from "../commons/sanitization.js";
import db from "../config/db.js";

export const getGeneralInfo = async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidEmployeeId(employeeId)) {
    return res.status(400).send("Invalid employee ID");
  }

  try {
    const { rows } = await db.query(`
      SELECT
        name,
        total_earnings,
        monthly_salary,
        salary_currency
      FROM
        employees
      WHERE
        employee_id = $1;
    `, [employeeId]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error("Error fetching employee general info:", error);
    res.status(500).send("Server error");
  }
};

export const getBalance = async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidEmployeeId(employeeId)) {
    return res.status(400).send("Invalid employee ID");
  }

  try {
    const { rows } = await db.query(`
      SELECT
        json_agg(
          json_build_object(
            'currency', b.currency,
            'amount', b.balance
          )
        ) AS balances
      FROM
        employees e
      JOIN
        employee_balances b ON e.employee_id = b.employee_id
      WHERE
        e.employee_id = $1
      GROUP BY
        e.employee_id;
    `, [employeeId]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error("Error fetching employee balances:", error);
    res.status(500).send("Server error");
  }
};

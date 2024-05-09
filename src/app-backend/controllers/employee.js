import db from '../config/db.js';

export const getBalance = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const { rows } = await db.query(`
      SELECT
        e.employee_id,
        e.name,
        e.total_earnings,
        e.monthly_salary,
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
        e.employee_id, e.name, e.total_earnings, e.monthly_salary;
    `, [employeeId]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error('Error fetching employee balances:', error);
    res.status(500).send('Server error');
  }
};


export const spendMoney = async (req, res) => {
  const { employeeId, amount, currency, description } = req.body;
  try {
    const emp = await db.query('SELECT current_balance FROM employees WHERE employee_id = $1', [employeeId]);
    if (emp.rows.length === 0) {
      return res.status(404).send('Employee not found');
    }

    if (emp.rows[0].current_balance < amount) {
      return res.status(400).send('Insufficient funds');
    }

    const newBalance = emp.rows[0].current_balance - amount;
    await db.query('UPDATE employees SET current_balance = $1 WHERE employee_id = $2', [newBalance, employeeId]);
    await db.query('INSERT INTO transactions (employee_id, type, amount, currency, description, transaction_date) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)', [employeeId, 'spend', amount, currency, description]);

    res.send('Transaction recorded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


// Function to perform a transfer
export const performTransfer = async (req, res) => {
  const { senderId, recipientId, amount, currency, description } = req.body;

  // Start a database transaction
  const client = await db.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Step 1: Deduct the amount from the sender's balance for the specified currency
    const deduct = `
      UPDATE employee_balances
      SET balance = balance - $1
      WHERE employee_id = $2 AND currency = $3 AND balance >= $1
      RETURNING *;
    `;
    const deducted = await client.query(deduct, [amount, senderId, currency]);
    if (deducted.rows.length === 0) {
      throw new Error('Insufficient funds, wrong currency, or sender not found');
    }

    // Step 2: Check if recipient has a balance entry in this currency
    const checkRecipientBalance = `
      SELECT balance FROM employee_balances
      WHERE employee_id = $1 AND currency = $2;
    `;
    const recipientBalanceResult = await client.query(checkRecipientBalance, [recipientId, currency]);

    // Step 3: Create balance if not exists
    if (recipientBalanceResult.rows.length === 0) {
      const createBalance = `
        INSERT INTO employee_balances (employee_id, currency, balance)
        VALUES ($1, $2, 0);
      `;
      await client.query(createBalance, [recipientId, currency]);
    }

    // Step 4: Add the amount to the recipient's balance
    const credit = `
      UPDATE employee_balances
      SET balance = balance + $1
      WHERE employee_id = $2 AND currency = $3
      RETURNING *;
    `;
    const credited = await client.query(credit, [amount, recipientId, currency]);
    if (credited.rows.length === 0) {
      throw new Error('Failed to credit recipient account, recipient or currency may not exist');
    }

    // Step 5: Insert the transaction record
    const insertTransaction = `
      INSERT INTO transactions (employee_id, type, amount, currency, description, recipient_id, transaction_date)
      VALUES ($1, 'transfer', $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *;
    `;
    const transactionResult = await client.query(insertTransaction, [senderId, amount, currency, description, recipientId]);

    await client.query('COMMIT'); // Commit the transaction
    res.send({ message: 'Transfer successful', transaction: transactionResult.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK'); // Roll back the transaction on error
    console.error('Transaction error:', error);
    res.status(500).send('Transaction failed');
  } finally {
    client.release();
  }
};


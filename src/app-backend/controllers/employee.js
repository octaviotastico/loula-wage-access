import db from '../config/db.js';

export const getBalance = async (req, res) => {
  try {
    const result = await db.query('SELECT current_balance FROM employees WHERE employee_id = $1', [req.params.employeeId]);
    if (result.rows.length > 0) {
      res.json({ currentBalance: result.rows[0].current_balance });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

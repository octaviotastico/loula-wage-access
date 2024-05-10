import { isValidPair } from "../commons/sanitization.js";
import db from "../config/db.js";

// Returns all exchange rates from currency_rates table
export const getExchangeRates = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT
        pair,
        rate
      FROM
        currency_rates;
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    res.status(500).send("Server error");
  }
}

// Returns exchange rate for a given currency pair
export const getExchangeRate = async (req, res) => {
  const { pair } = req.params;

  if (!isValidPair(employeeId)) {
    return res.status(400).send("Invalid currency pair");
  }

  try {
    const { rows } = await db.query(`
      SELECT
        rate
      FROM
        currency_rates
      WHERE
        pair = $1;
    `, [pair]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("Exchange rate not found");
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    res.status(500).send("Server error");
  }
};

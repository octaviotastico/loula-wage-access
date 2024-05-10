import express from "express";
import { getExchangeRate, getExchangeRates } from "../controllers/exchange.js";

const router = express.Router();

// Employee endpoints
router.get("/rates", getExchangeRates); // Returns all exchange rates from currency_rates table
router.get("/rate/:pair", getExchangeRate); // Returns exchange rate for a given currency pair

export default router;

import express from "express";
import {
  // Employee endpoints
  getGeneralInfo,
  getBalance,
  getTransactions,
  // Wage Advance endpoints
  checkAdvanceAvailable,
  getRequestedAdvances,
  requestAdvance,
  // Transaction endpoints
  performTransfer,
  spendMoney,
} from "../controllers/employee.js";

const router = express.Router();

// Employee endpoints
router.get("/employee/general/:employeeId", getGeneralInfo); // Get the balance of a specific employee
router.get("/employee/balance/:employeeId", getBalance); // Get the balance of a specific employee
router.get("/employee/transactions/:employeeId", getTransactions); // Get all the transactions of a specific employee

// Wage Advance endpoints
router.get("/advance/available/:employeeId", checkAdvanceAvailable); // Check if an advance is available for a specific employee
router.get("/advance/requested/:employeeId", getRequestedAdvances); // Get all the requested advances of this month for an employee
router.post("/advance/request/:employeeId", requestAdvance); // Request an advance

// Transaction endpoints
router.post("/transactions/transfer", performTransfer); // Transfer money to another employee
router.post("/transactions/spend", spendMoney); // Spend money on a purchase

export default router;

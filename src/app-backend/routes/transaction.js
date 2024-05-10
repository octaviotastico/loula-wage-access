import express from "express";
import { getTransactions, performTransfer, spendMoney } from "../controllers/transaction.js";

const router = express.Router();

router.get("/:employeeId", getTransactions); // Get all the transactions of a specific employee
router.post("/transfer", performTransfer); // Transfer money to another employee
router.post("/spend", spendMoney); // Spend money on a purchase

export default router;

import express from "express";
import { getBalance, requestAdvance, spendMoney, performTransfer, getTransactions } from "../controllers/employee.js";

const router = express.Router();

router.get("/balance/:employeeId", getBalance);
router.get("/transactions/:employeeId", getTransactions);
router.post("/request-advance", requestAdvance);
router.post("/transactions/spend", spendMoney);
router.post("/transactions/transfer", performTransfer);

export default router;

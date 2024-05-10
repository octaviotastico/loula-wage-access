import express from "express";
import { getGeneralInfo, getBalance } from "../controllers/employee.js";

const router = express.Router();

// Employee endpoints
router.get("/general/:employeeId", getGeneralInfo); // Get the balance of a specific employee
router.get("/balance/:employeeId", getBalance); // Get the balance of a specific employee

export default router;

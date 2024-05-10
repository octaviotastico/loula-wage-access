import express from "express";
import { checkAdvanceAvailable, getRequestedAdvances, requestAdvance } from "../controllers/advance.js";

const router = express.Router();

// Wage Advance endpoints
router.get("/available/:employeeId", checkAdvanceAvailable); // Check if an advance is available for a specific employee
router.get("/requested/:employeeId", getRequestedAdvances); // Get all the requested advances of this month for an employee
router.post("/request/:employeeId", requestAdvance); // Request an advance

export default router;

import express from 'express';
import { getBalance } from '../controllers/employee.js';

const router = express.Router();

router.get('/balance/:employeeId', getBalance);

export default router;

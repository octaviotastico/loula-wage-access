import express from 'express';
import { getBalance, spendMoney, performTransfer } from '../controllers/employee.js';

const router = express.Router();

router.get('/balance/:employeeId', getBalance);
router.post('/transactions/spend', spendMoney);
router.post('/transactions/transfer', performTransfer);

export default router;

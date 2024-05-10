// Library imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Local imports
import advanceRoutes from './routes/advance.js';
import employeeRoutes from './routes/employee.js';
import transactionRoutes from './routes/transaction.js';

// App configuration
const PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Endpoints
app.use('/advance', advanceRoutes);
app.use('/employee', employeeRoutes);
app.use('/transactions', transactionRoutes);
app.get('/', (_, res) => {
  res.send('Wage Access Platform API is alive!');
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Library imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Local imports
import employeeRoutes from './routes/employee.js';

// App configuration
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Endpoints
app.use('/', employeeRoutes);
app.get('/', (req, res) => {
  res.send('Wage Access Platform API');
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
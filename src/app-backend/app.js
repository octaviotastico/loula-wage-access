// Library imports
import express from 'express';
import bodyParser from 'body-parser';

// App configuration
const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// Endpoints
app.get('/', (req, res) => {
  res.send('Hello!!! Wage Access Platform API');
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
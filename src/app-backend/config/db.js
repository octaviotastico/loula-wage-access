import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  database: process.env.DB_NAME || 'loulawallet',
  password: process.env.DB_PASS || 'password',
  port: process.env.DB_PORT || 5432,
});

export default pool;
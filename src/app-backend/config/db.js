import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'loulawallet',
  password: 'password',
  port: 5432,
})

export default pool;
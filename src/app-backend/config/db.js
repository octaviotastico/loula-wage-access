import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: 'database',
  user: 'postgres',
  database: 'loulawallet',
  password: 'password',
  port: 5432,
})

export default pool;
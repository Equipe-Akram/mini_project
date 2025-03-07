import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
  host: process.env.DB_HOST,         
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,         
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME      
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

export default pool;

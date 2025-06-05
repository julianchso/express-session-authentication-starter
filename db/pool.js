import pg from 'pg';
const { Pool } = pg;

export default new Pool({
  host: '127.0.0.1',
  user: 'julianso',
  database: 'session_auth',
  password: '1234',
  port: 5432,
});

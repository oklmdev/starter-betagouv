import { Pool } from 'pg';

export const postgres = new Pool({
  user: 'oklm',
  host: 'localhost',
  database: 'oklm',
  password: 'oklm',
  port: 5436,
});

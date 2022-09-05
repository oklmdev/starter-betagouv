import { Pool } from 'pg';

const testConfig = {
  user: 'test',
  host: 'localhost',
  database: 'oklm_test',
  port: 5437,
  allowExitOnIdle: true,
  max: 10,
  idleTimeoutMillis: 2
};

const devConfig = {
  user: 'oklm',
  host: 'localhost',
  database: 'oklm',
  password: 'oklm',
  port: 5436
};

export const postgres = new Pool(process.env.NODE_ENV === 'test' ? testConfig : devConfig);

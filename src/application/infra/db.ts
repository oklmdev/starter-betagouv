import { Pool } from 'pg';

const pool = new Pool(
  process.env.NODE_ENV === 'test'
    ? { user: 'test', host: 'localhost', database: 'oklm_test', port: 5437 }
    : {
        user: 'oklm',
        host: 'localhost',
        database: 'oklm',
        password: 'oklm',
        port: 5436,
      }
);

export const postgres = {
  query: (text: string, params?: any) => {
    return pool.query(text, params);
  },
  resetDatabase: () => {
    const tables = ['events', 'demandes'];
    return Promise.all(tables.map((table) => pool.query(`TRUNCATE ${table}`)));
  },
};

export default {
  query: (text: string, params?: any) => {
    return pool.query(text, params);
  },
};

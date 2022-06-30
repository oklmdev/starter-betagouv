import { postgres } from '../postgres';
import { tables } from '../../tables';

export const resetDatabase = async () => {
  const tableNames = tables.map((p) => p.name);

  const client = await postgres.connect();

  try {
    await client.query('BEGIN');

    for (const tableName of tableNames) {
      await client.query(`TRUNCATE ${tableName}`);
    }
    await client.query(`TRUNCATE events`);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

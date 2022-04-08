import { postgres } from '../postgres';
import { projections } from '../projections';

export const resetDatabase = async () => {
  const tables = projections.map((p) => p.name);

  const client = await postgres.connect();

  try {
    await client.query('BEGIN');

    for (const table of tables) {
      await client.query(`TRUNCATE ${table}`);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

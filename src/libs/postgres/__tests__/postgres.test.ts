import { Pool } from 'pg';

if (process.env.NODE_ENV !== 'test') {
  console.log('Postgres test instance loaded outside of test environnement.');
  process.exit(1);
}

export const postgresTest = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'oklm_test',
  port: 5437,
  allowExitOnIdle: true,
  max: 10,
  idleTimeoutMillis: 2,
});

export const resetDatabase = async () => {
  const tables = ['events', 'demandes'];

  const client = await postgresTest.connect();

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

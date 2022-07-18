import { Pool, PoolClient } from 'pg';
import { EventBus, DomainEvent } from '../../types';

const createEventsTable =
  'CREATE TABLE IF NOT EXISTS events (id UUID PRIMARY KEY, type VARCHAR(255) NOT NULL, aggregate_ids VARCHAR(255)[], payload JSON, occurred_at TIMESTAMPTZ NOT NULL);';

interface PersistedEvent {
  id: string;
  type: string;
  aggregate_ids: string[] | null;
  payload: any;
  occurred_at: Date;
}

interface PostgresEventStoreDeps {
  publish: EventBus['publish'];
  postgres: Pool;
}

export const makePostgresEventStore = ({ publish, postgres }: PostgresEventStoreDeps) => {
  return {
    init: () => {
      console.log('Creating events table (postgresEventStore)');
      return postgres.query(createEventsTable);
    },
    publish: async (event: DomainEvent) => {
      const client = await postgres.connect();

      try {
        await client.query('BEGIN');

        // TODO: instead of locking the whole table, only lock aggregates of this event
        await client.query('LOCK TABLE events');

        await insertEventIntoDb(event, client);

        console.log('Publish done writing to db');
        await publish(event);
        console.log('Publish done publishing to event bus');

        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
    transaction: async (
      aggregateId: string,
      callback: (aggregateHistory: DomainEvent[]) => DomainEvent[] | Promise<DomainEvent[]>
    ) => {
      const client = await postgres.connect();

      try {
        await client.query('BEGIN');

        // TODO: instead of locking the whole table, lock a single aggregate
        await client.query('LOCK TABLE events');

        const { rows } = await client.query('SELECT * FROM events WHERE aggregate_ids && $1', [[aggregateId]]);

        const pendingEvents = await callback(rows.map(fromPersistance));

        for (const pendingEvent of pendingEvents) {
          await insertEventIntoDb(pendingEvent, client);
        }

        for (const pendingEvent of pendingEvents) {
          await publish(pendingEvent);
        }

        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    },
    getHistory: async (): Promise<DomainEvent[]> => {
      const { rows } = await postgres.query('SELECT * FROM events ORDER BY occurred_at ASC');

      return rows.map(fromPersistance);
    },
  };
};

export function toPersistance(event: DomainEvent): PersistedEvent {
  const { eventId, type, payload, occurredAt, aggregateId } = event;
  return {
    id: eventId,
    type,
    aggregate_ids: aggregateId ? (Array.isArray(aggregateId) ? aggregateId : [aggregateId]) : null,
    payload,
    occurred_at: new Date(occurredAt),
  };
}

export function fromPersistance(row: PersistedEvent): DomainEvent {
  const { id, type, payload, aggregate_ids, occurred_at } = row;

  const aggregateId =
    aggregate_ids === null ? {} : { aggregateId: aggregate_ids.length === 1 ? aggregate_ids[0] : aggregate_ids };

  return {
    eventId: id,
    type,
    payload,
    ...aggregateId,
    occurredAt: occurred_at.getTime(),
  };
}

export async function insertEventIntoDb(event: DomainEvent, client: Pool | PoolClient) {
  const { id, type, aggregate_ids, payload, occurred_at } = toPersistance(event);
  await client.query('INSERT INTO events (id, type, aggregate_ids, payload, occurred_at) VALUES ($1, $2, $3, $4, $5)', [
    id,
    type,
    aggregate_ids,
    payload,
    occurred_at,
  ]);
}

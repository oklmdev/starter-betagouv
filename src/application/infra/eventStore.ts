import { DomainEvent } from '../../archi/DomainEvent';
import { postgres } from './db';
import { eventBus } from './eventBus';

const createEventsTable =
  'CREATE TABLE IF NOT EXISTS events (id UUID PRIMARY KEY, type VARCHAR(255) NOT NULL, aggregate_ids VARCHAR(255)[], payload JSON, occurred_at TIMESTAMPTZ NOT NULL);';

export const initEventStore = async () => {
  console.log('Create events table');
  return postgres.query(createEventsTable);
};

export const publish = async (event: DomainEvent) => {
  const { eventId, type, payload, occurredAt, aggregateId } = event;
  await postgres.query('INSERT INTO events (id, type, aggregate_ids, payload, occurred_at) VALUES ($1, $2, $3, $4, $5)', [
    eventId,
    type,
    !aggregateId || Array.isArray(aggregateId) ? aggregateId : [aggregateId],
    payload,
    new Date(occurredAt),
  ]);
  await eventBus.publish(event);
};

export const transaction = async (
  aggregateId: string,
  callback: (aggregateHistory: DomainEvent[]) => DomainEvent[] | Promise<DomainEvent[]>
) => {
  // Start a transaction
};

export const getHistory = async (): Promise<DomainEvent[]> => {
  return [];
};

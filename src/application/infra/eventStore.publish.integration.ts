import { v4 as uuid } from 'uuid';
import { DomainEvent } from '../../archi/DomainEvent';
import { postgres } from './db';
import { eventBus } from './eventBus';
import { publish } from './eventStore';

describe('eventStore.publish', () => {
  describe('when the event has no aggregateId', () => {
    const fakeHandler = jest.fn((event: DomainEvent) => {});
    const eventId = uuid();
    const occurredAt = new Date();
    const payload = { param1: 123, param2: '123' };
    const event = { type: 'TEST', eventId, occurredAt: occurredAt.getTime(), payload };

    beforeAll(async () => {
      await postgres.resetDatabase();

      eventBus.subscribeAll(fakeHandler);

      await publish(event);
    });

    it('should save the event to the events table', async () => {
      const { rows: events, rowCount: eventCount } = await postgres.query('SELECT * FROM events');
      expect(eventCount).toEqual(1);

      const event = events[0];
      expect(event).toEqual({
        id: eventId,
        type: 'TEST',
        occurred_at: occurredAt,
        payload,
        aggregate_ids: null,
      });
    });

    it('should publish the event on the event bus', () => {
      expect(fakeHandler).toHaveBeenCalledWith(event);
    });
  });

  describe('when the event has a single aggregateId', () => {
    beforeAll(async () => {
      await postgres.resetDatabase();
    });
    it('should save the event to the events table', async () => {
      const eventId = uuid();
      const occurredAt = new Date();
      const payload = { param1: 123, param2: '123' };
      const type = 'TEST';
      const aggregateId = 'aggregateId';
      await publish({ type, eventId, aggregateId, occurredAt: occurredAt.getTime(), payload });

      const { rows: events, rowCount: eventCount } = await postgres.query('SELECT * FROM events');
      expect(eventCount).toEqual(1);

      const event = events[0];
      expect(event).toEqual({
        id: eventId,
        type,
        occurred_at: occurredAt,
        payload,
        aggregate_ids: [aggregateId],
      });
    });
  });

  describe('when the event has multiple aggregateIds', () => {
    beforeAll(async () => {
      await postgres.resetDatabase();
    });
    it('should save the event to the events table', async () => {
      const eventId = uuid();
      const occurredAt = new Date();
      const payload = { param1: 123, param2: '123' };
      const type = 'TEST';
      const aggregateId = ['aggregateId1', 'aggregateId2'];
      await publish({ type, eventId, aggregateId, occurredAt: occurredAt.getTime(), payload });

      const { rows: events, rowCount: eventCount } = await postgres.query('SELECT * FROM events');
      expect(eventCount).toEqual(1);

      const event = events[0];
      expect(event).toEqual({
        id: eventId,
        type,
        occurred_at: occurredAt,
        payload,
        aggregate_ids: aggregateId,
      });
    });
  });

  describe('when publishing an aggregate event while a transaction is open on that aggregate', () => {
    beforeAll(async () => {
      await postgres.resetDatabase();
    });

    it.todo('should wait for the transaction to finish before publishing the event');
  });
});

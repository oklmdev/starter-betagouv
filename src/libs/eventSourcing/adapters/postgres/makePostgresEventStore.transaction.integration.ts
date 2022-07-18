import { v4 as uuid } from 'uuid';
import { DomainEvent } from '../../types';
import { insertEventIntoDb, makePostgresEventStore, toPersistance } from './makePostgresEventStore';
import { postgresTest as postgres, resetDatabase } from './__tests__';

describe('postgresEventStore.transaction(aggregateId, callback)', () => {
  describe('when the aggregate has no history', () => {
    beforeAll(async () => {
      await resetDatabase();
    });

    it('should call the callback with an empty array', async () => {
      const { transaction } = makePostgresEventStore({ postgres, publish: jest.fn() });

      const callback = jest.fn((events: DomainEvent[]) => Promise.resolve([]));
      const aggregateId = 'aggregateId';
      await transaction(aggregateId, callback);

      expect(callback).toHaveBeenCalledWith([]);
    });
  });

  describe('when the aggregate has a history', () => {
    const eventId = uuid();
    const occurredAt = new Date();
    const payload = { param1: 123, param2: '123' };
    const aggregateId = 'aggregateId';
    const event = { type: 'TEST', eventId, aggregateId, occurredAt: occurredAt.getTime(), payload };
    const history = [event];

    const pendingEvents = [{ type: 'TEST2', eventId: uuid(), aggregateId, occurredAt: occurredAt.getTime(), payload }];

    const callback = jest.fn((events: DomainEvent[]) => Promise.resolve(pendingEvents));

    const publish = jest.fn();

    beforeAll(async () => {
      await resetDatabase();

      const { transaction } = makePostgresEventStore({ postgres, publish });

      for (const event of history) {
        await insertEventIntoDb(event, postgres);
      }

      await transaction(aggregateId, callback);
    });

    it('should call the callback with the aggregate history', async () => {
      expect(callback).toHaveBeenCalledWith(history);
    });

    it('should persist the events returned by the callback', async () => {
      const { rows, rowCount } = await postgres.query('SELECT * FROM events');
      expect(rowCount).toEqual(history.length + pendingEvents.length);
      expect(rows).toContainEqual(toPersistance(pendingEvents[0]));
    });

    it('should publish the events returned by the callback', async () => {
      expect(publish).toHaveBeenCalledWith(pendingEvents[0]);
    });
  });

  describe('when the db fails to persist one of the events', () => {
    const occurredAt = new Date();
    const payload = { param1: 123, param2: '123' };
    const aggregateId = 'aggregateId';

    const pendingEvents = [
      { type: 'TEST2', eventId: uuid(), aggregateId, occurredAt: occurredAt.getTime(), payload },
      {
        type: 'TEST2',
        eventId: uuid(),
        aggregateId: 'x'.repeat(256), // TOO LONG, WILL FAIL
        occurredAt: occurredAt.getTime(),
        payload,
      },
    ];

    const callback = jest.fn((events: DomainEvent[]) => Promise.resolve(pendingEvents));
    const errorHandler = jest.fn();
    const publish = jest.fn();

    beforeAll(async () => {
      await resetDatabase();

      const { transaction } = makePostgresEventStore({ postgres, publish });

      try {
        await transaction(aggregateId, callback);
      } catch (error) {
        errorHandler();
      }
    });

    it('should throw', () => {
      expect(errorHandler).toHaveBeenCalled();
    });

    it('should persist no events to db', async () => {
      const { rowCount } = await postgres.query('SELECT * FROM events');
      expect(rowCount).toEqual(0);
    });

    it('should publish no events', async () => {
      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('when the event bus fails to publish the events', () => {
    const occurredAt = new Date();
    const payload = { param1: 123, param2: '123' };
    const aggregateId = 'aggregateId';

    const pendingEvents = [{ type: 'TEST2', eventId: uuid(), aggregateId, occurredAt: occurredAt.getTime(), payload }];

    const callback = jest.fn((events: DomainEvent[]) => Promise.resolve(pendingEvents));
    const errorHandler = jest.fn();

    const publish = jest.fn(() => {
      throw new Error('test');
    });

    beforeAll(async () => {
      await resetDatabase();

      const { transaction } = makePostgresEventStore({ postgres, publish });

      try {
        await transaction(aggregateId, callback);
      } catch (error) {
        errorHandler();
      }
    });

    it('should throw', () => {
      expect(errorHandler).toHaveBeenCalled();
    });

    it('should persist no events to db', async () => {
      const { rowCount } = await postgres.query('SELECT * FROM events');
      expect(rowCount).toEqual(0);
    });
  });

  describe('when two transactions are open on the same aggregateId', () => {
    const occurredAt = new Date();
    const payload = { param1: 123, param2: '123' };
    const aggregateId = 'aggregateId';

    const pendingEvents = [{ type: 'TEST2', eventId: uuid(), aggregateId, occurredAt: occurredAt.getTime(), payload }];

    const callback1 = jest.fn((events) => pendingEvents);
    const callback2 = jest.fn((events) => []);

    beforeAll(async () => {
      await resetDatabase();

      const { transaction } = makePostgresEventStore({ postgres, publish: jest.fn() });

      const transaction1 = transaction(aggregateId, callback1);
      const transaction2 = transaction(aggregateId, callback2);
      await Promise.all([transaction1, transaction2]);
    });

    it('should wait for the first to finish before executing the second', async () => {
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith(pendingEvents);
    });
  });
});

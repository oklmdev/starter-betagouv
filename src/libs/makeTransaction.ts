import { Aggregate } from '../archi/Aggregate';
import { DomainEvent } from '../archi/DomainEvent';

type EventStoreTransaction = (
  aggregateId: string,
  callback: (aggregateHistory: DomainEvent[]) => DomainEvent[] | Promise<DomainEvent[]>
) => void;

export const makeTransaction =
  (eventStoreTransaction: EventStoreTransaction) =>
  <A extends Aggregate>(
    makeAggregate: (aggregateId: string, history?: DomainEvent[] | undefined) => A,
    aggregateId: string,
    callback: (aggregate: A) => void | Promise<void>
  ) => {
    // open a transaction on the event store (one level lower)
    return eventStoreTransaction(aggregateId, async (history) => {
      // use the history to build the aggregate
      const aggregateInstance = makeAggregate(aggregateId, history);
      await callback(aggregateInstance);
      return aggregateInstance.getPendingEvents();
    });
  };

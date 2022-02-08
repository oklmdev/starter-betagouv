import { DomainEvent } from '../../archi/DomainEvent';
import { makeQueue } from '../../libs/queue';

const memory: Record<string, DomainEvent[]> = {};
const queue = makeQueue();

export const transaction = async (
  aggregateId: string,
  callback: (history: DomainEvent[]) => DomainEvent[] | Promise<DomainEvent[]>
) => {
  // The queue is there to block the event store during the transaction
  return queue.push(async () => {
    const aggregateExists = !!memory[aggregateId];

    const history = aggregateExists ? memory[aggregateId] : [];

    const newEvents = await callback(history);

    memory[aggregateId] = [...memory[aggregateId], ...newEvents];
  });
};

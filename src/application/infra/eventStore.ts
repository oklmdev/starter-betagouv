import { DomainEvent } from '../../archi/DomainEvent';
import { makeQueue } from '../../libs/queue';
import { eventBus } from './eventBus';

const memory: Record<string, DomainEvent[]> = {};
const queue = makeQueue();

export const transaction = async (
  aggregateId: string,
  callback: (history: DomainEvent[]) => DomainEvent[] | Promise<DomainEvent[]>
) => {
  // The queue is there to block the event store during the transaction
  return queue.push(async () => {
    const history = memory[aggregateId] ?? [];

    const newEvents = await callback(history);

    memory[aggregateId] = [...memory[aggregateId], ...newEvents];

    for (const event of newEvents) {
      await eventBus.publish(event);
    }
  });
};

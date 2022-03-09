import { DomainEvent } from '../../archi/DomainEvent';
import { makeQueue } from '../../libs/queue';
import { eventBus } from './eventBus';

const memory: Record<string, DomainEvent[]> = {};
const history: DomainEvent[] = []
const queue = makeQueue();

export const publish = (event: DomainEvent) => {

  // The queue is there to block the event store during the transaction
  return queue.push(async () => {

    const aggregateIds = event.aggregateId

    if(aggregateIds){
      if(Array.isArray(aggregateIds)){
        for(const aggregateId of aggregateIds){
          memory[aggregateId] = [...memory[aggregateId] ?? [], event];
        }
      }
      else{
        console.log(memory[aggregateIds]);
        memory[aggregateIds] = [...memory[aggregateIds] ?? [], event];
      }
    }

    history.push(event)
    await eventBus.publish(event);
  });


}

export const transaction = async (
  aggregateId: string,
  callback: (aggregateHistory: DomainEvent[]) => DomainEvent[] | Promise<DomainEvent[]>
) => {
  // The queue is there to block the event store during the transaction
  return queue.push(async () => {
    const aggregateHistory = memory[aggregateId] ?? [];

    const newEvents = await callback(aggregateHistory);

    memory[aggregateId] = [...memory[aggregateId], ...newEvents];

    history.push(...newEvents)

    for (const event of newEvents) {
      await eventBus.publish(event);
    }
  });
};

export const getHistory = () => {
  return history
}
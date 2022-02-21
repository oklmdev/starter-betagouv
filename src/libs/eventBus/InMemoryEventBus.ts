import { DomainEvent } from '../../archi/DomainEvent';
import { EventBus, EventBusCallback } from '../../archi/EventBus';

// en version fonction :
export const makeInMemoryEventBus = (): EventBus => {
  const _subscriptions: Partial<Record<DomainEvent['type'], EventBusCallback[]>> = {};

  return {
    publish: async (event: DomainEvent) => {
      const { type } = event;

      const callbacks = _subscriptions[type];
      if (callbacks === undefined) {
        console.warn({ eventtype: event.type }, `There are no subscriptions for this type : '${event.type}'`);
        return;
      }

      await Promise.all(
        callbacks.map(async (cb) => {
          await cb(event);
        })
      );
    },
    subscribe: async <Event extends DomainEvent>(type: Event['type'], callback: EventBusCallback<Event>) => {
      _subscriptions[type] = [...(_subscriptions[type] || []), callback as EventBusCallback];
    },
  };
};

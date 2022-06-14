import { DomainEvent } from './types/DomainEvent';
import { EventDispatcher } from './types/EventDispatcher';
import { EventHandler } from './types/EventHandler';

export const makeEventDispatcher = (): EventDispatcher => {
  const handlersByType: Record<string, EventHandler<any>> = {};

  const handleEvent = async <Event extends DomainEvent>(event: Event) => {
    const { type } = event;
    if (handlersByType[type]) {
      await handlersByType[type](event);
    }
  };

  return {
    on: (type, handler) => {
      if (handlersByType[type]) {
        throw new Error(`The event ${type} already has an handler for this dispatcher`);
      }

      handlersByType[type] = handler;
      return handler;
    },

    handleEvent,
  };
};

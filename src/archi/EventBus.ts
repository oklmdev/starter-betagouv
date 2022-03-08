import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export interface EventBus {
  publish: (event: DomainEvent) => unknown | Promise<unknown>;
  subscribeAll(callBack: EventHandler<DomainEvent>): unknown;
  subscribe<Event extends DomainEvent>(type: Event['type'], callBack: EventHandler<Event>): unknown;
}

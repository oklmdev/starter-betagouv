import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export interface EventDispatcher {
  on: <Event extends DomainEvent>(eventType: Event['type'], eventHandler: EventHandler<Event>) => EventHandler<Event>;
  handleEvent: EventHandler;
}

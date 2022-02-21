import { DomainEvent } from './DomainEvent';

export interface EventBus {
  publish: (event: DomainEvent) => void | Promise<void>;
  subscribe<Event extends DomainEvent>(type: Event['type'], callBack: EventBusCallback<Event>): void;
}

export type EventBusCallback<Event extends DomainEvent = DomainEvent> = (e: Event) => void | Promise<void>;

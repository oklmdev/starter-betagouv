import { DomainEvent } from './DomainEvent';

export type EventHandler<Event = DomainEvent> = (event: Event) => unknown | Promise<unknown>;

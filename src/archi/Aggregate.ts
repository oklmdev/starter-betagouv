import { DomainEvent } from './DomainEvent';

export type PublishEvent = (event: DomainEvent) => void | Promise<void>;

export type Aggregate = {
  getPendingEvents: () => DomainEvent[]; // Used by the repository to save pending events after command
};

export type AggregateId = string;

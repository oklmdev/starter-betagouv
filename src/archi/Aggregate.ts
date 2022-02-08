import { DomainEvent } from './DomainEvent';

export type Aggregate = {
  id: string;
  getPendingEvents: () => DomainEvent[]; // Used by the repository to save pending events after command
  publishEvent: (event: DomainEvent) => void; // Used by commands to mutate the state
};

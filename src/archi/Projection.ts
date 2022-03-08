import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export interface Projection {
  requiresRebuild: () => boolean | Promise<boolean>;

  reset: () => unknown | Promise<unknown>;

  handleEvent: EventHandler<DomainEvent>;
}

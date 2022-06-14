import { DomainEvent } from './DomainEvent';
import { EventDispatcher } from './EventDispatcher';
import { EventHandler } from './EventHandler';

export interface ProjectionTable extends EventDispatcher {
  requiresRebuild: () => boolean | Promise<boolean>;

  reset: () => unknown | Promise<unknown>;

  handleEvent: EventHandler<DomainEvent>;

  name: string;
}

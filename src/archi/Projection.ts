import { DomainEvent } from './DomainEvent';
import { EventBus } from './EventBus';

export interface Projection {
  requiresRebuild: () => boolean | Promise<boolean>;

  reset: () => unknown | Promise<unknown>;

  buildFromEvent: (event: DomainEvent) => unknown | Promise<unknown>;

  initEventBus: (eventBus: EventBus) => unknown;
}

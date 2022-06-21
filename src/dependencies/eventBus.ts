import { makeInMemoryEventBus } from '../libs/eventSourcing/adapters/InMemoryEventBus';

export const eventBus = makeInMemoryEventBus();

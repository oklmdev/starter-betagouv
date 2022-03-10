import { makeInMemoryEventBus } from '../../libs/eventBus/InMemoryEventBus';

export const { publish, subscribe, subscribeAll } = makeInMemoryEventBus();

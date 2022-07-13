import { makeInMemoryEventBus } from '../libs/eventSourcing/adapters/InMemoryEventBus';
import { makePostgresEventStore } from '../libs/eventSourcing/adapters/postgres';
import { postgres } from './postgres';

const eventBus = makeInMemoryEventBus();

export const { subscribeAll } = eventBus;

export const { publish, transaction, init, getHistory } = makePostgresEventStore({
  postgres,
  publish: eventBus.publish.bind(eventBus),
});

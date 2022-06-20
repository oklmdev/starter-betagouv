import { makePostgresEventStore } from '../../libs/eventSourcing/adapters/postgres';
import { postgres } from './postgres';
import { eventBus } from './eventBus';

export const { publish, transaction, init, getHistory } = makePostgresEventStore({
  postgres,
  publish: eventBus.publish,
});

import { makePostgresEventStore } from '../../libs/postgres';
import { postgres } from './postgres';
import { publish as eventBusPublish } from './eventBus';

export const { publish, transaction, init, getHistory } = makePostgresEventStore({ postgres, publish: eventBusPublish });

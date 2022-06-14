import { makeTransaction } from '../../libs/makeTransaction';
import { transaction as eventStoreTransaction } from './eventStore';

export const transaction = makeTransaction(eventStoreTransaction);

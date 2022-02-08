import { Aggregate } from './Aggregate';

export type Repository<A extends Aggregate> = {
  transaction: (aggregateId: string, cb: (aggregate: A) => void) => Promise<void>;
};

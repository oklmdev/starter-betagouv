import { Aggregate } from './Aggregate';

export type AggregateTransaction<A extends Aggregate> = (
  aggregateId: string,
  cb: (aggregate: A) => void | Promise<void>
) => Promise<void>;

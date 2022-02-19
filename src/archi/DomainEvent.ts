import { v4 as uuid } from 'uuid';

export type DomainEvent = BaseDomainEvent & {
  type: string;
  payload: any;
};

export type BaseDomainEvent = {
  eventId: string;
  occurredAt: number;
  aggregateId?: string | string[];
};

const aggregateIdIfDefined = (aggregateId: AggregateId) => aggregateId ? {aggregateId} : {};

export const makeDomainEvent = <T extends string, P> (
  type: T, payload: P, aggregateId: AggregateId
): DomainEvent<T, P>  => ({
  eventId: uuid(),
  occurredAt: Date.now(),
  type,
  payload,
  ...aggregateIdIfDefined(aggregateId)
});

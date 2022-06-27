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

const aggregateIdIfDefined = (aggregateId: DomainEvent['aggregateId']) => (aggregateId ? { aggregateId } : {});

export const makeDomainEvent = <T extends string, P>(specifics: {
  type: T;
  payload: P;
  aggregateId?: DomainEvent['aggregateId'];
}): BaseDomainEvent & { type: T; payload: P } => ({
  eventId: uuid(),
  occurredAt: Date.now(),
  type: specifics.type,
  payload: specifics.payload,
  ...aggregateIdIfDefined(specifics.aggregateId),
});

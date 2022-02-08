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

export const makeBaseDomainEvent = (): BaseDomainEvent => {
  return {
    eventId: uuid(),
    occurredAt: Date.now(),
  };
};

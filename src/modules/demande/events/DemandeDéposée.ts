import { BaseDomainEvent, makeBaseDomainEvent } from '../../../archi/DomainEvent';

export type DemandeDéposée = BaseDomainEvent & {
  type: 'DemandeDéposée';
  payload: {
    demandeId: string;
    déposéePar: string;
    déposéeLe: number;
  };
};

export const makeDemandeDéposée = (payload: DemandeDéposée['payload']): DemandeDéposée => ({
  ...makeBaseDomainEvent(),
  type: 'DemandeDéposée',
  payload,
  aggregateId: payload.demandeId, // aggregateId is always derived from the payload
});

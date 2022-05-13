import { BaseDomainEvent, makeDomainEvent } from '../../../archi/DomainEvent';
import { TypeDemande } from '../TypesDemande';

export type DemandeDéposée = BaseDomainEvent & {
  type: 'DemandeDéposée';
  payload: {
    demandeId: string;
    type: TypeDemande;
    justification: string;
    déposéePar: string;
    déposéeLe: number;
  };
};

export const makeDemandeDéposée = (payload: DemandeDéposée['payload']): DemandeDéposée =>
  makeDomainEvent({
    type: 'DemandeDéposée',
    payload,
    aggregateId: payload.demandeId, // aggregateId is always derived from the payload
  });

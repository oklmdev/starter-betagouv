import { BaseDomainEvent, makeDomainEvent } from '../../../libs/archi/DomainEvent';
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

export const DemandeDéposée = (payload: DemandeDéposée['payload']): DemandeDéposée =>
  makeDomainEvent({
    type: 'DemandeDéposée',
    payload,
    aggregateId: payload.demandeId, // aggregateId is always derived from the payload
  });

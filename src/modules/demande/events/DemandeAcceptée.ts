import { BaseDomainEvent, makeDomainEvent } from '../../../archi/DomainEvent';

export type DemandeAcceptée = BaseDomainEvent & {
  type: 'DemandeAcceptée';
  payload: {
    demandeId: string;
    acceptéePar: string;
    acceptéeLe: number;
  };
};

export const makeDemandeAcceptée = (payload: DemandeAcceptée['payload']): DemandeAcceptée =>
  makeDomainEvent({
    type: 'DemandeAcceptée',
    payload,
    aggregateId: payload.demandeId, // aggregateId is always derived from the payload
  });

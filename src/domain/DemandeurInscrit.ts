import { BaseDomainEvent, makeDomainEvent } from '../libs/eventSourcing/types/DomainEvent';

export type DemandeurInscrit = BaseDomainEvent & {
  type: 'DemandeurInscrit';
  payload: {
    demandeurId: string;
    nomComplet: string;
    email: string;
  };
};

export const DemandeurInscrit = (payload: DemandeurInscrit['payload']): DemandeurInscrit =>
  makeDomainEvent({
    type: 'DemandeurInscrit',
    payload,
  });

import { DemandeDéposée } from '../../../modules/demande/events';
import { eventBus } from '../eventBus';
import { utilisateurs } from './utilisateurs';

type Demande = {
  id: string;
  type: string;
  justification: string;
  déposéePar?: {
    id: string;
    nom: string;
  };
};

export const demandes: Demande[] = [];

eventBus.subscribe<DemandeDéposée>('DemandeDéposée', ({ payload: { demandeId, type, justification, déposéePar } }) => {
  // on dénormalise à la projection
  const demandeur = utilisateurs.find(({ id }) => id === déposéePar);

  demandes.push({
    id: demandeId,
    type,
    justification,
    déposéePar: demandeur,
  });
});
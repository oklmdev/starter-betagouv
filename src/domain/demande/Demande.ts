// l'agrégat Demande

import { makeAggregate } from '../../libs/eventSourcing/makeAggregate';
import { DomainEvent } from '../../libs/eventSourcing/types/DomainEvent';
import { accepter, déposer } from './actions';

export type DemandeState = { status: 'nouvelle' | 'déposée' | 'acceptée' };

export function buildState(state: DemandeState, event: DomainEvent): DemandeState {
  switch (event.type) {
    case 'DemandeDéposée':
      return { ...state, status: 'déposée' };
    case 'DemandeAcceptée':
      return { ...state, status: 'acceptée' };
    default:
      return state;
  }
}

export const makeDemande = makeAggregate({
  initialState: { status: 'nouvelle' },
  buildState,
  actions: { accepter, déposer },
});

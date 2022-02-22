// l'agrégat Demande

import { makeAggregate } from '../../archi/Aggregate';
import { DomainEvent } from '../../archi/DomainEvent';
import * as actions from './actions';

export type DemandeState = { status: 'nouvelle' | 'déposée' | 'acceptée' };

export const makeDemande = makeAggregate({ initialState: { status: 'nouvelle' }, updateState, actions });

export type Demande = ReturnType<typeof makeDemande>;

export function updateState(state: DemandeState, event: DomainEvent): DemandeState {
  switch (event.type) {
    case 'DemandeDéposée':
      return { ...state, status: 'déposée' };
    case 'DemandeAcceptée':
      return { ...state, status: 'acceptée' };
    default:
      return state;
  }
}

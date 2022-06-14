// l'agrégat Demande

import { makeAggregate } from '../../libs/eventSourcing/makeAggregate';
import { DomainEvent } from '../../libs/eventSourcing/types/DomainEvent';
import * as actions from './actions';

export type DemandeState = { status: 'nouvelle' | 'déposée' | 'acceptée' };

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

export const Demande = makeAggregate({ initialState: { status: 'nouvelle' }, updateState, actions });

export type Demande = ReturnType<typeof Demande>;

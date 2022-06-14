// l'agrégat Demande

import { makeAggregate } from '../../libs/makeAggregate';
import { DomainEvent } from '../../libs/archi/DomainEvent';
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

type A = {
  param1: string;
  param2?: string;
};

const a: A = {
  param1: 'qsdqsd',
};

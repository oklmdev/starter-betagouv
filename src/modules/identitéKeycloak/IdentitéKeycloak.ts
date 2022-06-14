import { makeAggregate } from '../../libs/makeAggregate';
import { DomainEvent } from '../../libs/archi/DomainEvent';
import * as actions from './actions';

export type IdentitéKeycloakState = { estInscrit: boolean };

export const makeIdentitéKeycloak = makeAggregate({ initialState: { estInscrit: false }, updateState, actions });

export type IdentitéKeycloak = ReturnType<typeof makeIdentitéKeycloak>;

export function updateState(state: IdentitéKeycloakState, event: DomainEvent): IdentitéKeycloakState {
  switch (event.type) {
    case 'UtilisateurInscritViaKeycloak':
      return { ...state, estInscrit: true };
    default:
      return state;
  }
}

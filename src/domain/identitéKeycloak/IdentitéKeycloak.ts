import { makeAggregate } from '../../libs/eventSourcing/makeAggregate';
import { DomainEvent } from '../../libs/eventSourcing/types/DomainEvent';
import { inscrireUtilisateur } from './actions';

export type IdentitéKeycloakState = { estInscrit: boolean };

export const makeIdentitéKeycloak = makeAggregate({
  initialState: { estInscrit: false },
  buildState,
  actions: { inscrireUtilisateur },
});

export function buildState(state: IdentitéKeycloakState, event: DomainEvent): IdentitéKeycloakState {
  switch (event.type) {
    case 'UtilisateurInscritViaKeycloak':
      return { ...state, estInscrit: true };
    default:
      return state;
  }
}

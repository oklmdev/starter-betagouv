import { BaseDomainEvent, makeDomainEvent } from '../../../archi/DomainEvent';

export type UtilisateurInscritViaKeycloak = BaseDomainEvent & {
  type: 'UtilisateurInscritViaKeycloak';
  payload: {
    userId: string;
    keycloakId: string;
  };
};

export const makeUtilisateurInscritViaKeycloak = (
  payload: UtilisateurInscritViaKeycloak['payload']
): UtilisateurInscritViaKeycloak =>
  makeDomainEvent({
    type: 'UtilisateurInscritViaKeycloak',
    payload,
    aggregateId: payload.keycloakId, // aggregateId is always derived from the payload
  });

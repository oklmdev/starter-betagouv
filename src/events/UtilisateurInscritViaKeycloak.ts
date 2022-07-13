import { BaseDomainEvent, makeDomainEvent } from '../libs/eventSourcing/types/DomainEvent';

export type UtilisateurInscritViaKeycloak = BaseDomainEvent & {
  type: 'UtilisateurInscritViaKeycloak';
  payload: {
    userId: string;
    keycloakId: string;
  };
};

export const UtilisateurInscritViaKeycloak = (
  payload: UtilisateurInscritViaKeycloak['payload']
): UtilisateurInscritViaKeycloak =>
  makeDomainEvent({
    type: 'UtilisateurInscritViaKeycloak',
    payload,
    aggregateId: payload.keycloakId, // aggregateId is always derived from the payload
  });

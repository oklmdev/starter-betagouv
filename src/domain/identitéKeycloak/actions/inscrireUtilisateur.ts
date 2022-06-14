import { AggregateAction } from '../../../libs/eventSourcing/types/Aggregate';
import { makeUtilisateurInscritViaKeycloak } from '../events';

import type { IdentitéKeycloakState } from '../IdentitéKeycloak';

interface InscrireUtilisateurArgs {
  userId: string;
  keycloakId: string;
}
export const inscrireUtilisateur: AggregateAction<IdentitéKeycloakState, InscrireUtilisateurArgs> =
  ({ getState, publishEvent }) =>
  ({ userId, keycloakId }): void => {
    const { estInscrit } = getState();

    if (estInscrit) {
      throw new UtilisateurDéjàInscritError();
    }

    publishEvent(makeUtilisateurInscritViaKeycloak({ userId, keycloakId }));
  };

export class UtilisateurDéjàInscritError extends Error {
  constructor() {
    super('Un utilisateur est déjà inscrit pour cet identity provider.');
  }
}

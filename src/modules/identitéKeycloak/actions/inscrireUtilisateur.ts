import { AggregateAction } from '../../../libs/archi/Aggregate';
import { UtilisateurDéjàInscritError } from '../errors';
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

import { Projection } from '../../../archi/Projection';
import { demandeProjection } from './demandes';
import { utilisateurKeycloakProjection } from './utilisateur_keycloak';

export const projections: Projection[] = [demandeProjection, utilisateurKeycloakProjection];

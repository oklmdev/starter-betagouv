import { Projection } from '../../libs/archi/Projection';
import { demandeTable } from './demandes';
import { utilisateurKeycloakTable } from './utilisateur_keycloak';

export const tables: Projection[] = [demandeTable, utilisateurKeycloakTable];

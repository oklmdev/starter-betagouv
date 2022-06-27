import { ProjectionTable } from '../libs/eventSourcing/types/Projection';
import { demandeTable } from './demandes';
import { fauxUtilisateurTable } from './faux_utilisateur';
import { utilisateurKeycloakTable } from './utilisateur_keycloak';

export const tables: ProjectionTable[] = [demandeTable, utilisateurKeycloakTable, fauxUtilisateurTable];

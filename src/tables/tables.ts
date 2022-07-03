import { ProjectionTable } from '../libs/eventSourcing/types/Projection';
import { demandeTable } from './demandes';
import { utilisateurKeycloakTable } from './utilisateur_keycloak';
import { usersTable } from './users';

export const tables: ProjectionTable[] = [demandeTable, utilisateurKeycloakTable, usersTable];

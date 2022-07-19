import { Role } from '../../domain/Roles';

export type FauxUtilisateur = {
  userId: string;
  nom: string;
  role: Role;
};

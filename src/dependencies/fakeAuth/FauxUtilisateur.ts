import { Role } from '../../domain/authZ';

export type FauxUtilisateur = {
  userId: string;
  nom: string;
  role: Role;
};

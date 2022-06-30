import { Role } from '../../domain/authZ';

export type FakeUser = {
  userId: string;
  nom: string;
  role: Role;
};

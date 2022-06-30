import { BaseDomainEvent, makeDomainEvent } from '../libs/eventSourcing/types/DomainEvent';
import { Role } from './authZ';

export type FauxUtilisateurInscrit = BaseDomainEvent & {
  type: 'FauxUtilisateurInscrit';
  payload: {
    userId: string;
    role: Role;
    nom: string;
  };
};

export const FauxUtilisateurInscrit = (payload: FauxUtilisateurInscrit['payload']): FauxUtilisateurInscrit =>
  makeDomainEvent({
    type: 'FauxUtilisateurInscrit',
    payload,
  });

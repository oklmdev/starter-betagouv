import { Demande } from '../Demande';
import { AccepterNouvelleDemandeError } from '../errors';
import { AccepterDemandeDéjàAcceptéeError } from '../errors/AccepterDemandeDéjàAcceptéeError';
import { makeDemandeAcceptée } from '../events';

export const accepter = (
  demande: Demande,
  args: {
    acceptéePar: string;
    acceptéeLe: number;
  }
): void => {
  const { status } = demande.state;
  const { acceptéePar, acceptéeLe } = args;

  // First step is always validation, use the state to check the validity of the command

  if (status === 'nouvelle') {
    throw new AccepterNouvelleDemandeError();
  }

  if (status === 'acceptée') {
    throw new AccepterDemandeDéjàAcceptéeError();
  }

  // Ok, command is legal
  // Execute the effect (ie publish the event)
  demande.publishEvent(makeDemandeAcceptée({ acceptéeLe, acceptéePar, demandeId: demande.id }));
};

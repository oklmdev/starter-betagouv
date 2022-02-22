import { PublishEvent } from '../../../archi/Aggregate';
import { UserWithRole } from '../../authZ/UserWithRole';
import { Demande, DemandeState } from '../Demande';
import { DemandeDéjàAcceptéeError, DemandeNonDéposéeError } from '../errors';
import { makeDemandeAcceptée } from '../events';

export const accepter =
  ({ status, demandeId }: DemandeState, publishEvent: PublishEvent) =>
  (args: { acceptéePar: UserWithRole<'instructeur' | 'administrateur'>; acceptéeLe: number }): void => {
    const { acceptéePar, acceptéeLe } = args;

    // First step is always validation, use the state to check the validity of the command

    if (status === 'nouvelle') {
      throw new DemandeNonDéposéeError();
    }

    if (status === 'acceptée') {
      throw new DemandeDéjàAcceptéeError();
    }

    // Ok, command is legal
    // Execute the effect (ie publish the event)
    publishEvent(makeDemandeAcceptée({ acceptéeLe, acceptéePar: acceptéePar.id, demandeId }));
  };

import { AggregateAction } from '../../../archi/Aggregate';
import { DemandeState } from '../Demande';
import { DemandeNonDéposéeError, DemandeDéjàAcceptéeError } from '../errors';
import { makeDemandeAcceptée } from '../events';

interface AccepterArgs {
  acceptéePar: string;
  acceptéeLe: number;
}
export const accepter: AggregateAction<DemandeState, AccepterArgs> =
  ({ aggregateId, getState, publishEvent }) =>
  ({ acceptéePar, acceptéeLe }): void => {
    const { status } = getState();

    // First step is always validation, use the state to check the validity of the command

    if (status === 'nouvelle') {
      throw new DemandeNonDéposéeError();
    }

    if (status === 'acceptée') {
      throw new DemandeDéjàAcceptéeError();
    }

    // Ok, command is legal
    // Execute the effect (ie publish the event)
    publishEvent(makeDemandeAcceptée({ acceptéeLe, acceptéePar, demandeId: aggregateId }));
  };

import { AggregateAction } from '../../../libs/eventSourcing/types/Aggregate';
import type { DemandeState } from '../Demande';
import { DemandeAcceptée } from '../events';

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
    publishEvent(DemandeAcceptée({ acceptéeLe, acceptéePar, demandeId: aggregateId }));
  };

export class DemandeNonDéposéeError extends Error {
  constructor() {
    super("La demande ne peut être acceptée avant d'être déposée.");
  }
}

export class DemandeDéjàAcceptéeError extends Error {
  constructor() {
    super('La demande est déjà acceptée.');
  }
}

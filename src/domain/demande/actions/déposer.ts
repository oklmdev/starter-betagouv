import { AggregateAction } from '../../../libs/eventSourcing';
import { Epoch, NonEmptyishString } from '../../../libs/typeguards';
import type { DemandeState } from '../Demande';
import { TypeDemande } from '../TypesDemande';
import { DemandeDéposée } from '../../../events';
import { Demandeur } from '../../Roles';

interface DéposerArgs {
  type: TypeDemande;
  justification: NonEmptyishString;
  déposéePar: Demandeur;
  déposéeLe: Epoch;
}
export const déposer: AggregateAction<DemandeState, DéposerArgs> =
  ({ aggregateId, getState, publishEvent }) =>
  ({ type, justification, déposéePar, déposéeLe }): void => {
    const { status } = getState();
    const { id: demandeurId, role } = déposéePar;

    role;

    if (status !== 'nouvelle') {
      throw new DemandeDéjàDéposéeError();
    }

    publishEvent(DemandeDéposée({ demandeId: aggregateId, type, justification, déposéeLe, déposéePar: demandeurId }));
  };

export class DemandeDéjàDéposéeError extends Error {
  constructor() {
    super('Une demande avec cet id a déjà été déposée.');
  }
}

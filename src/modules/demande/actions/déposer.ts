import { AggregateAction } from '../../../archi/Aggregate';
import { Epoch, NonEmptyishString } from '../../../libs/typeguards';
import { Demandeur } from '../../authZ';
import type { DemandeState } from '../Demande';
import { DemandeDéjàDéposéeError } from '../errors';
import { DemandeDéposée } from '../events';
import { TypeDemande } from '../TypesDemande';

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

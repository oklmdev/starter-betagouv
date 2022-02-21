// l'agrégat Demande

import { Aggregate } from '../../archi/Aggregate';
import { DomainEvent } from '../../archi/DomainEvent';
import { accepter } from './actions';

export type DemandeState = { demandeId: string; status: 'nouvelle' | 'déposée' | 'acceptée' };
export type Demande = Aggregate & {
  accepter: ReturnType<typeof accepter>;
};

// TODO: mettre les parties génériques dans une méthode makeAggregate<AggregateState>(initialState, actions)
export const makeDemande = (demandeId: string, history?: DomainEvent[]): Demande => {
  const pendingEvents: DomainEvent[] = [];

  // Set the initial state
  let state: DemandeState = {
    demandeId,
    status: 'nouvelle',
  };

  // Update the state by calling handleEvent on each event in the history
  if (history) {
    for (const event of history) {
      state = handleEvent(state, event);
    }
  }

  const publishEvent = <Event extends DomainEvent>(event: Event) => {
    state = handleEvent(state, event);
    pendingEvents.push(event);
  };

  return {
    accepter: accepter(state, publishEvent),
    getPendingEvents: () => pendingEvents,
  };
};

export const handleEvent = (state: DemandeState, event: DomainEvent): DemandeState => {
  switch (event.type) {
      case 'DemandeDéposée':
        return { ...state, status: 'déposée' };
      case 'DemandeAcceptée':
        return { ...state, status: 'acceptée' };
      default:
        return state
        break;
    }
} 

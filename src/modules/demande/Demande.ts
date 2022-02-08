// l'agrégat Demande

import { Aggregate } from '../../archi/Aggregate';
import { DomainEvent } from '../../archi/DomainEvent';
import { accepter } from './commands';

export type DemandeState = { demandeId: string; status: 'nouvelle' | 'déposée' | 'acceptée' };
export type Demande = Aggregate & {
  accepter: ReturnType<typeof accepter>;
};

export const makeDemande = (demandeId: string, history?: DomainEvent[]): Demande => {
  const pendingEvents: DomainEvent[] = [];

  // Set the initial state
  const state: DemandeState = {
    demandeId,
    status: 'nouvelle',
  };

  // Update the state by calling handleEvent on each event in the history
  if (history) {
    for (const event of history) {
      handleEvent(event);
    }
  }

  function handleEvent(event: DomainEvent) {
    // Update the state based on the events

    switch (event.type) {
      case 'DemandeDéposée':
        state.status = 'déposée';
        break;
      case 'DemandeAcceptée':
        state.status = 'acceptée';
        break;
      default:
        break;
    }
  }

  const publishEvent = <Event extends DomainEvent>(event: Event) => {
    handleEvent(event);
    pendingEvents.push(event);
  };

  return {
    accepter: accepter(state, publishEvent),
    getPendingEvents: () => pendingEvents,
  };
};

// l'agrégat Demande

import { Aggregate } from '../../archi/Aggregate';
import { DomainEvent } from '../../archi/DomainEvent';

export type Demande = Aggregate & {
  state: { status: 'nouvelle' | 'déposée' | 'acceptée' };
};

export const makeDemande = (demandeId: string, history?: DomainEvent[]): Demande => {
  const pendingEvents: DomainEvent[] = [];

  // Set the initial state
  const state: Demande['state'] = {
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
    id: demandeId,
    state,
    getPendingEvents: () => pendingEvents,
    publishEvent,
  };
};

import { GenericEvent } from './EventBus';
import { createInMemoryEventBus } from './InMemoryEventBus';

type DomainEvent =
  | GenericEvent<'DemandeAccepté', { acceptePar: string }>
  | GenericEvent<'DemandeRejeté', { rejetePar: string }>;

// version class :
// const eventBus = new InMemoryEventBus<DomainEvent>();

// version fonction :
const eventBus = createInMemoryEventBus<DomainEvent>();

eventBus.subscribe('DemandeAccepté', (event) => {
  // do something
  event.payload.acceptePar; // OK
  // event.payload.rejetePar; -> erreur de compilation (car topic fourni : 'DemandeAccepté' )
});

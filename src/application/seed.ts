import { getHistory, publish } from './infra/eventStore';
import { DomainEvent } from '../archi/DomainEvent';
import { makeDemandeDéposée } from '../modules/demande/events';
import { v4 as uuid } from 'uuid';

const seedEvents: DomainEvent[] = [
  makeDemandeDéposée({
    demandeId: '448447ed-2367-4ec6-b6a6-df0536c1724a',
    type: 'réclamation',
    justification: 'Je ne suis pas oklm',
    déposéePar: uuid(),
    déposéeLe: Date.now(),
  }),
];

export async function seed() {
  const events = await getHistory();

  if (events.length) {
    console.log('Seed: History is not empty. Nothing inserted.');
    return;
  }

  console.log(`Seed: History is empty. Inserting ${seedEvents.length} seed events.`);

  for (const event of seedEvents) {
    await publish(event);
  }
}

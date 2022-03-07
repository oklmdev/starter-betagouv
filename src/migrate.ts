import { getHistory, publish } from './application/infra/eventStore'
import { projections } from './application/infra/projections/projections'
import { makeDemandeDéposée } from './modules/demande/events'
import { v4 as uuid } from 'uuid'
import { DomainEvent } from './archi/DomainEvent'

const seedEvents: DomainEvent[] = [makeDemandeDéposée({ demandeId: uuid(), type: 'réclamation', justification: 'Je ne suis pas oklm', déposéePar: uuid(), déposéeLe: Date.now()})]

async function seed(){
  for(const event of seedEvents){
    await publish(event)
  }
}

async function migrate(){

  // Step 1: prepare the projections (ex: create the table)
  for(const projection of projections){
    await projection.create()
  }
  
  // Step 2: Build the projections from history
  const events = await getHistory()
  for(const event of events){
    for(const projection of projections){
      await projection.buildFromEvent(event)
    }
  }
}

seed().then(() => {
  migrate()
})
import { getHistory } from './application/infra/eventStore'
import { projections } from './application/infra/projections/projections'
import { seed } from './seeds'



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
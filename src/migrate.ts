import { projections } from './application/infra/projections/projections'
import db from './application/infra/db'

async function migrate(){
  for(const projection of projections){
    db.query(projection)
  }
}

migrate()
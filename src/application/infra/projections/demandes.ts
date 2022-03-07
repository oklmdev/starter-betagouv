import { DomainEvent } from '../../../archi/DomainEvent';
import { DemandeDéposée } from '../../../modules/demande/events';
import db from '../db';

export const createDemandeProjection = "DROP TABLE demandes; CREATE TABLE demandes (id UUID, type VARCHAR(255), justification TEXT, déposée_le BIGINT, déposée_par UUID);";


const onDemandeDéposée = ({ payload: { demandeId, type, justification, déposéePar, déposéeLe } }: DemandeDéposée) => {
  return db.query('INSERT INTO demandes VALUES ($1, $2, $3, $4, $5);', [demandeId, type, justification, déposéeLe, déposéePar])
}

const projecteurs: Record<string, any> = {
  'DemandeDéposée': onDemandeDéposée
}


export const demandeProjection = {

  create: () => {
    return db.query(createDemandeProjection)
  },

  buildFromEvent: async (event: DomainEvent) => {
    if(projecteurs[event.type]){
      projecteurs[event.type](event)
    }
  }

}
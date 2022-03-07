import { DomainEvent } from '../../../archi/DomainEvent';
import { EventBus } from '../../../archi/EventBus';
import { DemandeAcceptée, DemandeDéposée } from '../../../modules/demande/events';
import db from '../db';

export const createDemandeProjection = "DROP TABLE demandes; CREATE TABLE demandes (id UUID PRIMARY KEY, type VARCHAR(255), justification TEXT, status VARCHAR(255), déposée_le BIGINT, déposée_par UUID);";


const onDemandeDéposée = ({ payload: { demandeId, type, justification, déposéePar, déposéeLe } }: DemandeDéposée) => {
  return db.query('INSERT INTO demandes VALUES ($1, $2, $3, $4, $5, $6);', [demandeId, type, justification, 'déposée', déposéeLe, déposéePar])
}

const onDemandeAcceptée = ({ payload: { demandeId, acceptéePar, acceptéeLe } }: DemandeAcceptée) => {
  return db.query('UPDATE demandes SET status=$1 WHERE id=$2;', ['acceptée', demandeId])
}

const projecteurs: Record<string, any> = {
  'DemandeDéposée': onDemandeDéposée,
  'DemandeAcceptée': onDemandeAcceptée
}


export const demandeProjection = {

  create: () => {
    return db.query(createDemandeProjection)
  },

  buildFromEvent: async (event: DomainEvent) => {
    if(projecteurs[event.type]){
      projecteurs[event.type](event)
    }
  },

  initEventBus: (eventBus: EventBus) => {
    for(const [type, projector] of Object.entries(projecteurs)){
      eventBus.subscribe(type, projector)
    }
  }

}
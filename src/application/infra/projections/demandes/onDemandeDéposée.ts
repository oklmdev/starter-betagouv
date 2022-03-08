import { DemandeDéposée } from '../../../../modules/demande/events';
import { demandeProjection } from './demandes';
import db from '../../db';

demandeProjection.on<DemandeDéposée>(
  'DemandeDéposée',
  ({ payload: { demandeId, type, justification, déposéePar, déposéeLe } }) => {
    return db.query('INSERT INTO demandes VALUES ($1, $2, $3, $4, $5, $6);', [
      demandeId,
      type,
      justification,
      'déposée',
      déposéeLe,
      déposéePar,
    ]);
  }
);

import { DemandeDéposée } from '../../../../modules/demande/events';
import { postgres } from '../../postgres';
import { demandeProjection } from './demandes';

demandeProjection.on<DemandeDéposée>(
  'DemandeDéposée',
  ({ payload: { demandeId, type, justification, déposéePar, déposéeLe } }) => {
    return postgres.query('INSERT INTO demandes VALUES ($1, $2, $3, $4, $5, $6);', [
      demandeId,
      type,
      justification,
      'déposée',
      déposéeLe,
      déposéePar,
    ]);
  }
);

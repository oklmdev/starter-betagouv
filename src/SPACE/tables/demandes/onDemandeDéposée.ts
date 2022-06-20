import { DemandeDéposée } from '../../../domain/demande/events';
import { postgres } from '../../dependencies/postgres';
import { demandeTable } from './demandes';

demandeTable.on<DemandeDéposée>('DemandeDéposée', ({ payload: { demandeId, type, justification, déposéePar, déposéeLe } }) => {
  return postgres.query('INSERT INTO demandes VALUES ($1, $2, $3, $4, $5, $6);', [
    demandeId,
    type,
    justification,
    'déposée',
    déposéeLe,
    déposéePar,
  ]);
});

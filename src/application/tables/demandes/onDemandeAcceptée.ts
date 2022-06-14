import { DemandeAcceptée } from '../../../domain/demande/events';
import { postgres } from '../../infra/postgres';
import { demandeTable } from './demandes';

demandeTable.on<DemandeAcceptée>('DemandeAcceptée', ({ payload: { demandeId, acceptéePar, acceptéeLe } }) => {
  return postgres.query('UPDATE demandes SET status=$1, acceptée_le=$3 WHERE id=$2;', ['acceptée', demandeId, acceptéeLe]);
});

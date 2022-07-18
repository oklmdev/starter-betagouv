import { DemandeAcceptée } from '../../events';
import { postgres } from '../../dependencies/postgres';
import { demandeTable } from './demandes';

demandeTable.on<DemandeAcceptée>('DemandeAcceptée', ({ payload: { demandeId, acceptéePar, acceptéeLe } }) => {
  return postgres.query('UPDATE demandes SET status=$1, acceptée_le=$3 WHERE id=$2;', ['acceptée', demandeId, acceptéeLe]);
});

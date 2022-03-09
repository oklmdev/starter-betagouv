import { DemandeAcceptée } from '../../../../modules/demande/events';
import { postgres } from '../../db';
import { demandeProjection } from './demandes';

demandeProjection.on<DemandeAcceptée>('DemandeAcceptée', ({ payload: { demandeId, acceptéePar, acceptéeLe } }) => {
  return postgres.query('UPDATE demandes SET status=$1 WHERE id=$2;', ['acceptée', demandeId]);
});

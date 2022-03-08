import { DemandeAcceptée } from '../../../../modules/demande/events';
import db from '../../db';
import { demandeProjection } from './demandes';

demandeProjection.on<DemandeAcceptée>('DemandeAcceptée', ({ payload: { demandeId, acceptéePar, acceptéeLe } }) => {
  return db.query('UPDATE demandes SET status=$1 WHERE id=$2;', ['acceptée', demandeId]);
});

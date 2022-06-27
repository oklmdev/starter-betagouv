import { postgres } from '../../dependencies/postgres';
import { fauxUtilisateurTable } from './faux_utilisateur';
import { FauxUtilisateurInscrit } from '../../domain/FauxUtilisateurInscrit';

fauxUtilisateurTable.on<FauxUtilisateurInscrit>('FauxUtilisateurInscrit', ({ payload }) => {
  const { userId, role, nom } = payload;
  return postgres.query('INSERT INTO faux_utilisateur VALUES ($1, $2, $3);', [userId, role, nom]);
});

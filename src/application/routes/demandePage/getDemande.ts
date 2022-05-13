import { postgres } from '../../infra/postgres';
import { DemandePageProps } from './DemandePage';

export const getDemande = async (demandeId: string): Promise<DemandePageProps['demande'] | null> => {
  const demandes = await postgres.query('SELECT * FROM demandes WHERE id=$1', [demandeId]);

  if (!demandes.rowCount) return null;

  const demande = { ...demandes.rows[0], acceptéeLe: Number(demandes.rows[0].acceptée_le) };

  return demande;
};

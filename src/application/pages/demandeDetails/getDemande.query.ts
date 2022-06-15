import { postgres } from '../../infra/postgres';
import { DemandeDetailsPageProps } from './DemandeDetailsPage';

export const getDemande = async (demandeId: string): Promise<DemandeDetailsPageProps['demande'] | null> => {
  const { rows, rowCount } = await postgres.query('SELECT * FROM demandes WHERE id=$1', [demandeId]);

  if (!rowCount) return null;

  const demande = rows[0];

  const { id, justification, status, acceptée_le } = demande;

  return {
    id,
    justification,
    status,
    acceptéeLe: Number(acceptée_le),
  };
};

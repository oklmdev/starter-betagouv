import db from '../../infra/db';
import { DemandePageProps } from './DemandePage';


export const getDemande = async (demandeId: string): Promise<DemandePageProps['demande'] | null> => {
  
  const demandes = await db.query('SELECT * FROM demandes WHERE id=$1', [demandeId])
  
  if(!demandes.rowCount) return null;

  const demande = demandes.rows[0]

  return demande

};

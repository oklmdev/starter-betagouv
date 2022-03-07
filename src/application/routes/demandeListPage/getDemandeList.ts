import db from '../../infra/db';
import { DemandePageProps } from '../demandePage/DemandePage';
import { DemandeListPageProps } from './DemandeListPage';


export const getDemandeList = async (): Promise<DemandeListPageProps> => {
  
  const demandes = await db.query('SELECT * FROM demandes')
  
  if(!demandes.rowCount) return { demandes: []};

  return {
    demandes: demandes.rows.map(({ id, type, déposée_le }) => ({ id, type, déposéeLe: Number(déposée_le) }))
  }

};

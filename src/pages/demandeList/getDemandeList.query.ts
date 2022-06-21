import { postgres } from '../../dependencies/postgres';
import { DemandeListPageProps } from './DemandeListPage';

export const getDemandeList = async (): Promise<DemandeListPageProps['demandes']> => {
  const demandes = await postgres.query('SELECT * FROM demandes');

  if (!demandes.rowCount) return [];

  return demandes.rows.map(({ id, type, déposée_le }) => ({ id, type, déposéeLe: Number(déposée_le) }));
};

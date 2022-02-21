import { DemandePageProps } from './DemandePage';
import { demandes } from '../../infra/projections/demandes';

export const getDemande = async (demandeId: string): Promise<DemandePageProps | null> => {
  const demande = demandes.find(({ id }) => id === demandeId);

  if (!demande) return null;

  return {};
};

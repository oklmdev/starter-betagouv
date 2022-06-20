import { Response } from 'express';
import { router } from '../../router';
import { responseAsHtml } from '../../../libs/responseAsHtml';
import { DemandeDetailsPage } from './DemandeDetailsPage';
import { getDemande } from './getDemande.query';

router.route('/demande/:demandeId').get(async (request, response) => {
  const { demandeId } = request.params;
  console.log(`GET on /demande/${demandeId}`);
  return returnDemandePage(demandeId, response);
});

export const returnDemandePage = async (demandeId: string, response: Response, message?: string) => {
  const demande = await getDemande(demandeId);

  if (!demande) return response.status(404).send();

  responseAsHtml(response, DemandeDetailsPage({ demande, message }));
};

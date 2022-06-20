import { Response } from 'express';
import { responseAsHtml } from '../../../libs/responseAsHtml';
import { pageRouter } from '../pageRouter';
import { DemandeDetailsPage } from './DemandeDetailsPage';
import { getDemande } from './getDemande.query';

pageRouter.route('/demande/:demandeId').get(async (request, response) => {
  const { demandeId } = request.params;
  console.log(`GET on /demande/${demandeId}`);
  return returnDemandePage(demandeId, response);
});

export const returnDemandePage = async (demandeId: string, response: Response, message?: string) => {
  const demande = await getDemande(demandeId);

  if (!demande) return response.status(404).send();

  responseAsHtml(response, DemandeDetailsPage({ demande, message }));
};

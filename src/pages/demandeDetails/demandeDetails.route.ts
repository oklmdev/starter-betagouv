import { Request, Response } from 'express';
import { responseAsHtml } from '../../libs/responseAsHtml';
import { pageRouter } from '../pageRouter';
import { DemandeDetailsPage } from './DemandeDetailsPage';
import { getDemande } from './getDemande.query';
import { requireAuth } from '../../dependencies/authn';

pageRouter.route('/demande/:demandeId').get(requireAuth(), async (request, response) => {
  const { demandeId } = request.params;
  console.log(`GET on /demande/${demandeId}`);
  return returnDemandePage(demandeId, request, response);
});

export const returnDemandePage = async (demandeId: string, request: Request, response: Response, message?: string) => {
  const demande = await getDemande(demandeId);

  if (!demande) return response.status(404).send();

  responseAsHtml(request, response, DemandeDetailsPage({ demande, message }));
};

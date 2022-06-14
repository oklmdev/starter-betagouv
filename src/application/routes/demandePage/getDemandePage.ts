import type { Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import { router } from '../router';
import { DemandePage } from './DemandePage';
import { getDemande } from './getDemande';

export const returnDemandePage = async (demandeId: string, response: Response, message?: string) => {
  const demande = await getDemande(demandeId);

  if (!demande) return response.status(404).send();

  response.send(ReactDOMServer.renderToString(DemandePage({ demande, message })));
};

router.route('/demande/:demandeId').get(async (request, response) => {
  const { demandeId } = request.params;
  console.log(`GET on /demande/${demandeId}`);
  return returnDemandePage(demandeId, response);
});

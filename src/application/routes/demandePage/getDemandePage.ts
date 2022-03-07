import ReactDOMServer from 'react-dom/server';
import { demandeRepo } from '../../infra/repositories';
import { DemandePage } from './DemandePage';
import { router } from '../router';
import { getDemande } from './getDemande';
import type { Response } from 'express'


const returnDemandePage = async (demandeId: string, response: Response, message?: string) => {

    const demande = await getDemande(demandeId);

    if(!demande) return response.status(404).send()

    response.send(ReactDOMServer.renderToString(DemandePage({ demande, message })));
}

router
  .route('/demande/:demandeId')
  .get(async (request, response) => {
    const { demandeId } = request.params;
    console.log(`GET on /demande/${demandeId}`);
    return returnDemandePage(demandeId, response)
  })
  .post(async (request, response) => {
    const { demandeId } = request.params;

    console.log(`POST on /demande/${demandeId}`);

    // TODO: validation: make sure demandeId is proper

    // TODO: get user from session
    // TODO: make sure user has the rights to do this

    try {
      // We could call a use-case at the stage but the logic is so simple, it's not necessary, call the command via the repo

      await demandeRepo.transaction(demandeId, (demande) => {
        demande.accepter({ acceptéeLe: Date.now(), acceptéePar: 'TODO: user.id' });
      });

      return returnDemandePage(demandeId, response, 'Demande acceptée')
    } catch (error) {
      if (error instanceof Error) {
        // Potentially do something different based on the exact error class
        return returnDemandePage(demandeId, response, error.message)
      }

      return returnDemandePage(demandeId, response, `La demande n'a pas pu être acceptée: erreur système.`)
    }
  });

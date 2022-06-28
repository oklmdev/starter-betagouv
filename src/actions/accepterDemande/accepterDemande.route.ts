import { makeDemande } from '../../domain/demande/Demande';
import { transaction } from '../../dependencies/eventStore';
import { returnDemandePage } from '../../pages/demandeDetails';
import { actionsRouter } from '../actionsRouter';
import { requireAuth } from '../../dependencies/authn';

actionsRouter.route('/demande/:demandeId').post(requireAuth(), async (request, response) => {
  const { demandeId } = request.params;

  console.log(`POST on /demande/${demandeId}`);

  // TODO: validation: make sure demandeId is proper

  // TODO: get user from session
  // TODO: make sure user has the rights to do this

  try {
    // We could call a use-case at the stage but the logic is so simple, it's not necessary, call the command via the repo

    await transaction(demandeId, (events) => {
      const demande = makeDemande(demandeId, events);
      demande.accepter({ acceptéeLe: Date.now(), acceptéePar: request.session.user!.id });
      return demande.getPendingEvents();
    });

    return returnDemandePage(demandeId, request, response, 'Demande acceptée');
  } catch (error) {
    if (error instanceof Error) {
      // Potentially do something different based on the exact error class
      return returnDemandePage(demandeId, request, response, error.message);
    }

    return returnDemandePage(demandeId, request, response, `La demande n'a pas pu être acceptée: erreur système.`);
  }
});

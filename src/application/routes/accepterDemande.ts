import { accepter } from '../../modules/demande/commands';
import { demandeRepo } from '../infra/repositories';
import { router } from './router';

router.post('/accepterDemande', async (request, response) => {
  const { demandeId } = request.body;

  // TODO: make sure demandeId is proper

  // TODO: get user from session
  // TODO: make sure user has the rights to do this

  try {
    // We could call a use-case at the stage but the logic is so simple, it's not necessary, call the command via the repo

    await demandeRepo.transaction(demandeId, (demande) => {
      accepter(demande, { acceptéeLe: Date.now(), acceptéePar: 'TODO: user.id' });
    });

    response.send('OK');
  } catch (error) {
    if (error instanceof Error) {
      // Potentially do something different based on the exact error class
      response.status(400).send(error.message);
    }

    response.status(500).send();
  }
});

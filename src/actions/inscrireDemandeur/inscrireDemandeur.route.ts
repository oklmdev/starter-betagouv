import z from 'zod';
import { publish } from '../../dependencies/eventStore';
import { actionsRouter } from '../actionsRouter';
import { DemandeurInscrit } from '../../domain/DemandeurInscrit';
import { createUserCredentials } from '../../dependencies/authn';

actionsRouter.route('/inscription.html').post(async (request, response) => {
  console.log(`POST on /inscription`);

  // Validation des données
  const { demandeurId, nomComplet, email } = z
    .object({
      demandeurId: z.string().uuid(),
      nomComplet: z.string().min(2),
      email: z.string().email(),
    })
    .parse(request.body);

  await publish(DemandeurInscrit({ demandeurId, nomComplet, email }));
  await createUserCredentials({ userId: demandeurId, nom: nomComplet, role: 'demandeur' });

  response.redirect('/');
});

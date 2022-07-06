import z, { ZodError } from 'zod';
import { publish } from '../../dependencies/eventStore';
import { actionsRouter } from '../actionsRouter';
import { DemandeurInscrit } from '../../domain/DemandeurInscrit';
import { createUserCredentials } from '../../dependencies/authn';
import { responseAsHtml } from '../../libs/responseAsHtml';
import { InscriptionPage } from '../../pages/inscription/InscriptionPage';

actionsRouter.route('/inscription.html').post(async (request, response) => {
  console.log(`POST on /inscription`);

  // Validation des données
  try {
    const { demandeurId, nomComplet, email } = z
      .object({
        demandeurId: z.string().uuid(),
        nomComplet: z.string().min(2, 'Votre nom complet doit avoir plus de 2 caractères'),
        email: z.string().email('Vous devez donner une adresse mail valide'),
      })
      .parse(request.body);

    await publish(DemandeurInscrit({ demandeurId, nomComplet, email }));
    await createUserCredentials({ userId: demandeurId, nom: nomComplet, role: 'demandeur' });
    response.redirect('/');
  } catch (error) {
    const { nomComplet, email } = request.body;
    if (error instanceof ZodError) {
      console.log(error.issues);
      return responseAsHtml(
        request,
        response,
        InscriptionPage({ errors: error.issues.map((issue) => ({ message: issue.message })), nomComplet, email })
      );
    }
    /*  return responseAsHtml(request, response, InscriptionPage({ error: "Une erreur s'est produite", nomComplet, email })); */
  }
});

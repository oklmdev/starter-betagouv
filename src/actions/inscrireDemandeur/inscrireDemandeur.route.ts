import z, { ZodError } from 'zod';
import { publish } from '../../dependencies/eventStore';
import { actionsRouter } from '../actionsRouter';
import { createUserCredentials, isUserIdAvailable } from '../../dependencies/authn';
import { responseAsHtml } from '../../libs/ssr';
import { InscriptionPage } from '../../pages/inscription/InscriptionPage';
import { DemandeurInscrit } from '../../events';

actionsRouter.route('/inscription.html').post(async (request, response) => {
  console.log(`POST on /inscription`);

  try {
    const { demandeurId, nomComplet, email } = z
      .object({
        demandeurId: z.string().uuid(),
        nomComplet: z.string().min(2, 'Votre nom complet doit avoir plus de 2 caractères'),
        email: z.string().email('Vous devez donner une adresse mail valide')
      })
      .parse(request.body);

    if (!(await isUserIdAvailable(demandeurId))) {
      await publish(DemandeurInscrit({ demandeurId, nomComplet, email }));

      await createUserCredentials({ userId: demandeurId, nom: nomComplet, role: 'demandeur' });

      response.redirect('/');
    } else {
      response.redirect('./');
    }
  } catch (error) {
    const { nomComplet, email } = request.body;
    if (error instanceof ZodError) {
      const myErrors = error.issues.reduce((errorMap, { message, path }) => ({ ...errorMap, [path[0]]: message }), {});

      return responseAsHtml(
        request,
        response,
        InscriptionPage({
          errors: myErrors,
          nomComplet,
          email
        })
      );
    }
  }
});

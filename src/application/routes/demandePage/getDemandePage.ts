import ReactDOMServer from 'react-dom/server';
import { demandeRepo } from '../../infra/repositories';
import { DemandePage } from './DemandePage';
import { router } from '../router';
import { assertRole, User, UserRole, UserWithRole } from '../../../modules/authZ';

// TODO: implementation in infra
const getDemande = async (demandeId: string) => ({ id: demandeId, title: 'test' });

// TODO: implementation in session middleware
const getCurrentUser = async (): Promise<User> => ({ id: '', role: '' });

router
  .route('/demande/:demandeId')
  .get(async (request, response) => {
    const { demandeId } = request.params;
    console.log(`GET on /demande/${demandeId}`);
    const demande = await getDemande(demandeId);

    response.send(ReactDOMServer.renderToString(DemandePage({ demande })));
  })
  .post(async (request, response) => {
    const { demandeId } = request.params;

    console.log(`POST on /demande/${demandeId}`);

    // TODO: validation: make sure demandeId is proper

    try {
      const user = await getCurrentUser();
      assertRole(user, ['administrateur', 'instructeur']);

      // We could call a use-case at the stage but the logic is so simple, it's not necessary, call the command via the repo
      await demandeRepo.transaction(demandeId, (demande) => {
        demande.accepter({ acceptéeLe: Date.now(), acceptéePar: user });
      });

      const demande = await getDemande(demandeId);

      response.send(ReactDOMServer.renderToString(DemandePage({ demande, message: 'Demande acceptée' })));
    } catch (error) {
      const demande = await getDemande(demandeId);

      if (error instanceof Error) {
        // Potentially do something different based on the exact error class
        response.send(ReactDOMServer.renderToString(DemandePage({ demande, message: error.message })));
        return;
      }

      response.send(
        ReactDOMServer.renderToString(DemandePage({ demande, message: `La demande n'a pas pu être acceptée: erreur système.` }))
      );
    }
  });

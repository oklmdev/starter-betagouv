import ReactDOMServer from 'react-dom/server';
import z from 'zod';
import { responseAsHtml } from '../../../libs/responseAsHtml';
import { getEpoch, zNonEmptyishString } from '../../../libs/typeguards';
import { isDemandeur } from '../../../modules/authZ';
import { makeDemande } from '../../../modules/demande/Demande';
import { DemandeDéjàDéposéeError } from '../../../modules/demande/errors';
import { typesDemandes } from '../../../modules/demande/TypesDemande';
import { keycloak } from '../../infra/keycloak/keycloak';
import { demandeRepo } from '../../infra/repositories';
import { transaction } from '../../infra/transaction';
import { DemandeListPage } from '../../pages/demandeList/DemandeListPage';
import { getDemandeList } from '../../pages/demandeList/getDemandeList.query';
import { router } from '../../router';

router.route('/demandes').post(keycloak.protect(), async (request, response) => {
  console.log(`POST on /demandes`);

  const { demandeId, type, justification } = z
    .object({
      demandeId: z.string().uuid(),
      type: z.enum(typesDemandes),
      justification: zNonEmptyishString,
    })
    .parse(request.body);

  try {
    // We could call a use-case at the stage but the logic is so simple, it's not necessary, call the command via the repo

    const user = request.session.user;

    if (!user || !isDemandeur(user)) {
      throw new Error('Réservé aux demandeurs');
    }

    await transaction(makeDemande, demandeId, (demande) => {
      demande.déposer({ type, justification, déposéeLe: getEpoch(new Date()), déposéePar: user });
    });
  } catch (error) {
    if (error instanceof DemandeDéjàDéposéeError) {
      console.error('Demande déjà déposée, on ne fait rien');
    }
  }

  const demandes = await getDemandeList();

  responseAsHtml(response, DemandeListPage(demandes));
});

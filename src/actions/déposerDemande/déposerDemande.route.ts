import z from 'zod';
import { isDemandeur } from '../../domain/authZ';
import { DemandeDéjàDéposéeError } from '../../domain/demande/actions';
import { makeDemande } from '../../domain/demande/Demande';
import { typesDemandes } from '../../domain/demande/TypesDemande';
import { responseAsHtml } from '../../libs/responseAsHtml';
import { getEpoch, zNonEmptyishString } from '../../libs/typeguards';
import { transaction } from '../../dependencies/eventStore';
import { keycloak } from '../../dependencies/keycloak/keycloak';
import { DemandeListPage } from '../../pages/demandeList/DemandeListPage';
import { getDemandeList } from '../../pages/demandeList/getDemandeList.query';
import { actionsRouter } from '../actionsRouter';

actionsRouter.route('/demandes').post(keycloak.protect(), async (request, response) => {
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

    await transaction(demandeId, (events) => {
      const demande = makeDemande(demandeId, events);
      demande.déposer({ type, justification, déposéeLe: getEpoch(new Date()), déposéePar: user });
      return demande.getPendingEvents();
    });
  } catch (error) {
    if (error instanceof DemandeDéjàDéposéeError) {
      console.error('Demande déjà déposée, on ne fait rien');
    }
  }

  const demandes = await getDemandeList();

  responseAsHtml(response, DemandeListPage(demandes));
});

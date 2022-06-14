import { Repository } from '../../../libs/archi/Repository';
import { Demande, makeDemande } from '../../../modules/demande/Demande';
import { transaction as eventStoreTransaction } from '../eventStore';

export const demandeRepo: Repository<Demande> = {
  transaction: async (demandeId, callback) =>
    // open a transaction on the event store (one level lower)
    eventStoreTransaction(demandeId, async (history) => {
      // use the history to build the aggregate
      const demande = makeDemande(demandeId, history);
      await callback(demande);
      return demande.getPendingEvents();
    }),
};

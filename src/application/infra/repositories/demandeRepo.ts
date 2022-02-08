import { DomainEvent } from '../../../archi/DomainEvent';
import { Repository } from '../../../archi/Repository';
import { Demande, makeDemande } from '../../../modules/demande/Demande';

export const demandeRepo: Repository<Demande> = {
  transaction: async (demandeId, callback) => {
    // TODO: open a transaction on the event store
    // to load the events with aggregateId == demandeId
    const history: DomainEvent[] = [];

    const demande = makeDemande(demandeId, history);

    callback(demande);

    // TODO: return demande.getPendingEvents() to close the transaction
  },
};

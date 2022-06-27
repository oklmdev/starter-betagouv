import { makeProjectionTable } from '../../libs/eventSourcing/makeProjectionTable';
import { postgres } from '../../dependencies/postgres';

const deleteFauxUtilisateurTable = 'DROP TABLE IF EXISTS faux_utilisateur;';
const createFauxUtilisateurTable = 'CREATE TABLE faux_utilisateur (id UUID PRIMARY KEY, role VARCHAR(36), nom VARCHAR);';

export const fauxUtilisateurTable = makeProjectionTable({
  name: 'faux_utilisateur',

  reset: async () => {
    console.log('Creating faux_utilisateur table');
    await postgres.query(deleteFauxUtilisateurTable);
    await postgres.query(createFauxUtilisateurTable);
  },
});

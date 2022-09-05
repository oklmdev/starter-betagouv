import { makeProjectionTable } from '../../libs/eventSourcing/makeProjectionTable';
import { postgres } from '../../dependencies/postgres';

const deleteDemandeTable = 'DROP TABLE IF EXISTS demandes;';

const createDemandeTable =
  'CREATE TABLE demandes (id UUID PRIMARY KEY, type VARCHAR(255), justification TEXT, status VARCHAR(255), déposée_le BIGINT, déposée_par UUID, acceptée_le BIGINT);';

export const demandeTable = makeProjectionTable({
  name: 'demandes',

  reset: async () => {
    console.log('Creating demandes table (demandes projection)');
    await postgres.query(deleteDemandeTable);
    await postgres.query(createDemandeTable);
  }
});

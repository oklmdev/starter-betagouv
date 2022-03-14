import { EventDispatcher } from '../../../../archi/EventDispatcher';
import { Projection } from '../../../../archi/Projection';
import { makeEventDispatcher } from '../../../../libs/makeEventDispatcher';
import { postgres } from '../../postgres';

export const createDemandeProjection =
  'DROP TABLE IF EXISTS demandes; CREATE TABLE demandes (id UUID PRIMARY KEY, type VARCHAR(255), justification TEXT, status VARCHAR(255), déposée_le BIGINT, déposée_par UUID, acceptée_le BIGINT);';

export const demandeProjection: Projection & EventDispatcher = {
  ...makeEventDispatcher(),

  name: 'demandes',

  requiresRebuild: () => {
    // Always rebuild for now
    // TODO: check if the schema has changed
    return true;
  },

  reset: () => {
    console.log('Creating demandes table (demandes projection)');
    return postgres.query(createDemandeProjection);
  },
};

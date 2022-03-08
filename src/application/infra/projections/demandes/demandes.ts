import { EventDispatcher } from '../../../../archi/EventDispatcher';
import { Projection } from '../../../../archi/Projection';
import { makeEventDispatcher } from '../../../../libs/makeEventDispatcher';
import db from '../../db';

export const createDemandeProjection =
  'DROP TABLE demandes; CREATE TABLE demandes (id UUID PRIMARY KEY, type VARCHAR(255), justification TEXT, status VARCHAR(255), déposée_le BIGINT, déposée_par UUID);';

export const demandeProjection: Projection & EventDispatcher = {
  ...makeEventDispatcher(),

  requiresRebuild: () => {
    return true;
  },

  reset: () => {
    return db.query(createDemandeProjection);
  },
};

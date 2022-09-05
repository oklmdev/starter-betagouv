import * as React from 'react';
import { SessionContext } from '../_components/SessionContext';

import { DemandeListPage } from './DemandeListPage';

export default { title: 'Liste de demandes', component: DemandeListPage };

export const Vide = () => <DemandeListPage demandes={[]} />;

export const NonVide = () => (
  <DemandeListPage
    demandes={[
      {
        id: '123',
        type: 'réclamation',
        déposéeLe: new Date().getTime()
      }
    ]}
  />
);

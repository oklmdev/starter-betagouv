import * as React from 'react';

import { DemandeDetailsPage } from './DemandeDetailsPage';

export default { title: 'Détail de la demande', component: DemandeDetailsPage };

export const Basique = () => (
  <DemandeDetailsPage
    demande={{
      id: '123',
      justification: 'Ceci est la justification',
      status: 'déposée',
    }}
  />
);

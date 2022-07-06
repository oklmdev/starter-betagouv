import * as React from 'react';

import { InscriptionPage } from './InscriptionPage';

export default { title: "Page d'inscription", component: InscriptionPage };

export const Basique = () => <InscriptionPage />;

export const Error = () => <InscriptionPage errors={{ nomComplet: 'Votre nom doit avoir plus de 2 caractères' }} />;

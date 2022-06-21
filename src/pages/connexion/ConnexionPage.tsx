import { Layout } from '../_components/layout/Layout';
import { TextInput, Button } from '@dataesr/react-dsfr';

import * as React from 'react';

export type ConnexionPageProps = {};

export const ConnexionPage = ({}: ConnexionPageProps) => {
  return (
    <Layout>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <form method='post'>
          <div>
            <TextInput label='Email' />
            <TextInput label='Mot de passe' />
            <Button submit> Se Connecter</Button> <br />
            <div style={{ marginTop: 10 }}> Mot de passe oublié ?</div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

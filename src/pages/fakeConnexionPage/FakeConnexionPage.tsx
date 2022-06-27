import { Layout } from '../_components/layout/Layout';
import { Button } from '@dataesr/react-dsfr';

import * as React from 'react';

export type FakeConnexionPageProps = {
  fakeUsers: { userId: string; nom: string; role: string }[];
};

export const FakeConnexionPage = ({ fakeUsers }: FakeConnexionPageProps) => {
  return (
    <Layout>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <form method='post'>
          Login de demo
          <div>
            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <div className='fr-select-group'>
                <select className='fr-select' id='select' name='select'>
                  <option selected disabled hidden>
                    Selectionnez un identifiant
                  </option>
                </select>
              </div>
            </div>
            <Button submit> Se Connecter</Button> <br />
            <div style={{ marginTop: 10 }}> Mot de passe oublié ?</div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

import { Layout } from '../../../pages/_components/layout/Layout';
import { Button } from '@dataesr/react-dsfr';

import * as React from 'react';
import { FauxUtilisateur } from '../FauxUtilisateur';

export type FakeConnexionPageProps = {
  fakeUsers: FauxUtilisateur[];
  redirectTo?: string;
};

export const FakeConnexionPage = ({ fakeUsers, redirectTo }: FakeConnexionPageProps) => {
  return (
    <Layout>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <form method='post'>
          {!!redirectTo && <input type='hidden' name='redirectTo' value={redirectTo} />}
          Login de demo (vous serez redirigés vers {redirectTo})
          <div>
            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <div className='fr-select-group'>
                <select className='fr-select' id='select' name='userId'>
                  <option selected disabled hidden>
                    Selectionnez un identifiant
                  </option>

                  {fakeUsers.map(({ userId, role, nom }) => (
                    <option key={userId} value={userId}>
                      {nom} ({role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button submit> Se Connecter</Button> <br />
          </div>
        </form>
      </div>
    </Layout>
  );
};

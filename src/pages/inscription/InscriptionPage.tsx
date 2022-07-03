import { Layout } from '../_components/layout/Layout';
import { Button } from '@dataesr/react-dsfr';
import { v4 as uuid } from 'uuid';

import * as React from 'react';

export const InscriptionPage = () => {
  return (
    <Layout>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <form method='post'>
          <input type='hidden' name='userId' value={uuid()} />
          <div>
            <label>
              Nom et Prénom :
              <input type='text' className='fr-input' id='username' name='username' required />
            </label>
            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
              <label>
                Email :
                <input type='email' className='fr-input' id='email' name='email' required />
              </label>
            </div>
            <Button submit> S'inscrire </Button> <br />
          </div>
        </form>
      </div>
    </Layout>
  );
};

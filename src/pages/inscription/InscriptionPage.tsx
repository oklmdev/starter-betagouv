import { Layout } from '../_components/layout/Layout';
import { Button, Alert } from '@dataesr/react-dsfr';
import { v4 as uuid } from 'uuid';

import * as React from 'react';
import { TextInput } from '../_components/TextInput';

export type InscriptionPageProps = {
  nomComplet?: string;
  email?: string;
  errors?: { nomComplet?: string };
};

export const InscriptionPage = ({ errors, nomComplet, email }: InscriptionPageProps) => {
  return (
    <Layout>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <form method='post'>
          <input type='hidden' name='demandeurId' value={uuid()} />

          <div>
            <TextInput error={errors?.nomComplet} name='nomComplet' defaultValue={nomComplet} label='Nom et prénom' />
            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
              <label>
                Email :
                <input type='text' className='fr-input' name='email' required defaultValue={email} />
              </label>
            </div>
            <Button submit> S'inscrire </Button> <br />
          </div>
        </form>
      </div>
    </Layout>
  );
};

import { Layout } from '../_components/layout/Layout';
import { TextInput, Button } from '@dataesr/react-dsfr';
import './style.css';

import * as React from 'react';

export type ConnexionPageProps = {};

export const ConnexionPage = ({}: ConnexionPageProps) => {
  return (
    <Layout>
      <div>
        <form method='post' className='connexion-form'>
          <div className='connexion-inputs'>
            <TextInput label='Email' />
            <TextInput label='Mot de passe' />
            <Button submit> Se Connecter</Button> <br />
            <span className='mdp'> Mot de passe oublié ?</span>
          </div>
        </form>
      </div>
    </Layout>
  );
};

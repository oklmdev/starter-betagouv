import * as React from 'react';
import { Layout } from '../components/layout/Layout';

import { Highlight, Button } from '@dataesr/react-dsfr';

export type DemandeDetailsPageProps = {
  demande: {
    id: string;
    justification: string;
    status: string;
    acceptéeLe?: number;
  };
  message?: string;
};

export const DemandeDetailsPage = ({ demande, message }: DemandeDetailsPageProps) => {
  const { justification, id, status } = demande;
  return (
    <Layout>
      <h2>Demande n°{id}</h2>
      <div style={{ marginTop: '20px' }}>
        <Highlight>{justification}</Highlight>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Status: </span> {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
      {status === 'déposée' && (
        <form method='post' style={{ marginTop: '30px' }}>
          <Button submit>Accepter la demande</Button>
        </form>
      )}
      {status === 'acceptée' && demande.acceptéeLe && <div>Acceptée le {new Date(demande.acceptéeLe).toDateString()}</div>}
      {message && <div>{message}</div>}
    </Layout>
  );
};

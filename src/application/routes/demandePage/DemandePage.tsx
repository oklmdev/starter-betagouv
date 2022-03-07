import * as React from 'react';

export type DemandePageProps = {
  demande: {
    id: string;
    justification: string;
    status: string
  };
  message?: string;
};

export const DemandePage = ({ demande, message }: DemandePageProps) => {
  const { justification, id, status } = demande;
  return (
    <div>
      Demande
      <div>{justification}</div>
      <div>Status: {status}</div>
      { (true || status === 'déposée') && 
      <form method='post'>
        <button type='submit'>Accepter la demande</button>
      </form>}
      {message && <div>{message}</div>}
    </div>
  );
};

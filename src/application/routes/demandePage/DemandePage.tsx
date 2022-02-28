import * as React from 'react';

export type DemandePageProps = {
  demande: {
    id: string;
    justification: string;
  };
  message?: string;
};

export const DemandePage = ({ demande, message }: DemandePageProps) => {
  const { justification, id } = demande;
  return (
    <div>
      Demande
      <div>{justification}</div>
      <form method='post'>
        <button type='submit'>Accepter la demande</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

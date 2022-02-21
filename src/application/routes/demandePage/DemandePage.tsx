import * as React from 'react';

export type DemandePageProps = {
  demande: {
    id: string;
    title: string;
  };
  message?: string;
};

export const DemandePage = ({ demande, message }: DemandePageProps) => {
  const { title, id } = demande;
  return (
    <div>
      Demande {title}{' '}
      <form method='post'>
        <button type='submit'>Accepter la demande</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

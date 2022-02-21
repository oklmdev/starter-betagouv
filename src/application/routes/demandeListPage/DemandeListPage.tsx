import * as React from 'react';

type DemandeListPageProps = {
  demandes: {
    id: string;
    déposéeLe: number;
    type: string;
    demandeur?: { id: string; nom: string };
  }[];
};

export const DemandeListPage = ({ demandes }: DemandeListPageProps) => {
  return (
    <div>
      Demandes
      <table>
        <thead>
          <th>Date de dépôt</th>
          <th>type</th>
          <th>demandeur</th>
        </thead>
        <tbody>
          {demandes.length ? (
            demandes.map(({ id, type, déposéeLe, demandeur }, index) => (
              <tr key={`demande_${id}`}>
                <td>{new Date(déposéeLe).toString()}</td>
                <td>{type}</td>
                <td>{demandeur?.nom || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Aucune demande pour le moment</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

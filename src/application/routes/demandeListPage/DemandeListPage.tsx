import * as React from 'react';

export type DemandeListPageProps = {
  demandes: { id: string; type: string; déposéeLe: number }[];
};

export const DemandeListPage = ({ demandes }: DemandeListPageProps) => {
  return (
    <div>
      Demandes
      <div>Il y a {demandes.length} demandes en base</div>
      <ul>
        {demandes.map(({ id, type, déposéeLe }) => (
          <li key={`demande_${id}`}>
            <a href={`/demande/${id}`}>
              {type} déposée le {new Date(déposéeLe).toString()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

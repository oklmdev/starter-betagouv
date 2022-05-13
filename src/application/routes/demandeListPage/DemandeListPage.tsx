import * as React from 'react';
import { v4 as uuid } from 'uuid';

export type DemandeListPageProps = {
  demandes: { id: string; type: string; déposéeLe: number }[];
};

export const DemandeListPage = ({ demandes }: DemandeListPageProps) => {
  return (
    <div>
      <h1>Demandes</h1>
      <div style={{ marginTop: 20 }}>Il y a {demandes.length} demandes en base</div>
      <ul>
        {demandes.map(({ id, type, déposéeLe }) => (
          <li key={`demande_${id}`}>
            <a href={`/demande/${id}`}>
              {type} déposée le {new Date(déposéeLe).toString()}
            </a>
          </li>
        ))}
      </ul>
      <form method='POST'>
        <input type='hidden' name='demandeId' value={uuid()} />
        <div>
          <label htmlFor='type'>Type</label>
          <select name='type' style={{ display: 'block' }}>
            <option value='réclamation'>Réclamation</option>
            <option value='récupération-de-points'>Récupérer mes points</option>
          </select>
        </div>
        <div>
          <label htmlFor='justification'>Justification</label>
          <textarea name='justification' style={{ display: 'block' }} />
        </div>
        <button>Envoyer</button>
      </form>
    </div>
  );
};

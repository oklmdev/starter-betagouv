import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Layout } from '../components/layout/Layout';

import { Table, TextInput, Button } from '@dataesr/react-dsfr';

const columns = [
  {
    name: 'type',
    label: 'Type',
  },
  {
    name: 'déposéeLe',
    label: 'Déposé le',
    render: ({ déposéeLe }: DemandeListPageProps['demandes'][number]) => new Date(déposéeLe).toString(),
    sortable: true,
  },
  {
    render: ({ id }: DemandeListPageProps['demandes'][number]) => <a href={`/demande/${id}`}>Accéder</a>,
  },
];

export type DemandeListPageProps = {
  demandes: { id: string; type: string; déposéeLe: number }[];
};

export const DemandeListPage = ({ demandes }: DemandeListPageProps) => {
  return (
    <Layout>
      <h1>Demandes</h1>
      <div style={{ marginTop: 20 }}>Il y a {demandes.length} demandes en base</div>
      {demandes.length > 0 && (
        <Table rowKey='id' data={demandes} columns={columns} pagination paginationPosition='center' perPage={3} />
      )}
      <h2 style={{ marginTop: '30px' }}> Nouvelle demande </h2>
      <form method='POST'>
        <input type='hidden' name='demandeId' value={uuid()} />
        <div>
          <div className='fr-select-group'>
            <label className='fr-label' htmlFor='select'>
              Type de demande
            </label>
            <select className='fr-select' id='select' name='select'>
              <option selected disabled hidden>
                Selectionnez une option
              </option>
              <option value='réclamation'>Réclamation</option>
              <option value='récupération-de-points'>Récupérer mes points</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <TextInput label='Justification' textarea />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button>Envoyer</Button>
        </div>
      </form>
    </Layout>
  );
};

import { DemandeState, buildState } from './Demande';
import { DemandeAcceptée, DemandeDéposée } from '../../events';

const demandeId = '';

const initialState: DemandeState = {
  status: 'nouvelle'
};

describe('Demande', () => {
  it('doit donner accès aux actions `accepter` et `déposer`', (): void => {});

  describe('quand il reçoit un événement DemandeAcceptée', () => {
    it('doit retourner un status accepté', () => {
      expect(buildState(initialState, DemandeAcceptée({ demandeId, acceptéeLe: 123, acceptéePar: '' }))).toEqual({
        status: 'acceptée'
      });
    });
  });

  describe('quand il reçoit un événement DemandeDéposée', () => {
    it('doit retourner un status déposée', () => {
      expect(
        buildState(
          initialState,
          DemandeDéposée({ demandeId, type: 'réclamation', justification: '', déposéeLe: 123, déposéePar: '' })
        )
      ).toEqual({
        status: 'déposée'
      });
    });
  });
});

import { DemandeState, updateState } from './Demande';
import { DemandeAcceptée, DemandeDéposée } from './events';

const demandeId = '';

const initialState: DemandeState = {
  status: 'nouvelle',
};

describe('Demande', () => {
  describe('quand il reçoit un événement DemandeAcceptée', () => {
    it('doit retourner un status accepté', () => {
      expect(updateState(initialState, DemandeAcceptée({ demandeId, acceptéeLe: 123, acceptéePar: '' }))).toEqual({
        status: 'acceptée',
      });
    });
  });

  describe('quand il reçoit un événement DemandeDéposée', () => {
    it('doit retourner un status déposée', () => {
      expect(
        updateState(
          initialState,
          DemandeDéposée({ demandeId, type: 'réclamation', justification: '', déposéeLe: 123, déposéePar: '' })
        )
      ).toEqual({
        status: 'déposée',
      });
    });
  });
});

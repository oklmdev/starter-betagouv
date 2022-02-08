import { accepter } from '.';
import { Demande } from '../Demande';
import { AccepterNouvelleDemandeError } from '../errors';
import { AccepterDemandeDéjàAcceptéeError } from '../errors/AccepterDemandeDéjàAcceptéeError';
import { makeDemandeAcceptée } from '../events';

describe('accepter(Demande)', () => {
  const acceptéeLe = 123456;
  const acceptéePar = 'user123';
  const demandeId = 'demande123';

  describe('Quand la demande est juste déposée', () => {
    const publishEvent = jest.fn();
    const demande: Demande = {
      id: demandeId,
      state: {
        status: 'déposée',
      },
      getPendingEvents: jest.fn(),
      publishEvent,
    };

    it('doit émettre un événement de type DemandeAcceptée', () => {
      accepter(demande, { acceptéeLe, acceptéePar });

      expect(publishEvent).toHaveBeenCalledWith({
        ...makeDemandeAcceptée({ demandeId, acceptéeLe, acceptéePar }),
        eventId: expect.anything(),
      });
    });
  });

  describe('Quand la demande est nouvelle', () => {
    const publishEvent = jest.fn();
    const demande: Demande = {
      id: '',
      state: {
        status: 'nouvelle',
      },
      getPendingEvents: jest.fn(),
      publishEvent,
    };

    it('doit émettre une erreur', () => {
      expect(() => accepter(demande, { acceptéeLe, acceptéePar })).toThrowError(AccepterNouvelleDemandeError);

      expect(publishEvent).not.toBeCalled();
    });
  });

  describe('Quand la demande est déjà acceptée', () => {
    const publishEvent = jest.fn();
    const demande: Demande = {
      id: '',
      state: {
        status: 'acceptée',
      },
      getPendingEvents: jest.fn(),
      publishEvent,
    };

    it('doit émettre une erreur', () => {
      expect(() => accepter(demande, { acceptéeLe, acceptéePar })).toThrowError(AccepterDemandeDéjàAcceptéeError);
      expect(publishEvent).not.toBeCalled();
    });
  });
});

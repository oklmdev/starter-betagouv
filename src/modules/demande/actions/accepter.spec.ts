import { accepter } from '.';
import { DemandeNonDéposéeError } from '../errors';
import { DemandeDéjàAcceptéeError } from '../errors/DemandeDéjàAcceptéeError';
import { makeDemandeAcceptée } from '../events';

describe('accepter(Demande)', () => {
  const acceptéeLe = 123456;
  const acceptéePar = 'user123';
  const demandeId = 'demande123';

  describe('Quand la demande est juste déposée', () => {
    const publishEvent = jest.fn();

    it('doit émettre un événement de type DemandeAcceptée', () => {
      accepter(
        {
          demandeId,
          status: 'déposée',
        },
        publishEvent
      )({ acceptéeLe, acceptéePar });

      expect(publishEvent).toHaveBeenCalledWith({
        ...makeDemandeAcceptée({ demandeId, acceptéeLe, acceptéePar }),
        eventId: expect.anything(),
        occurredAt: expect.anything(),
      });
    });
  });

  describe('Quand la demande est nouvelle', () => {
    const publishEvent = jest.fn();

    it('doit émettre une erreur', () => {
      expect(() =>
        accepter(
          {
            demandeId,
            status: 'nouvelle',
          },
          publishEvent
        )({ acceptéeLe, acceptéePar })
      ).toThrowError(DemandeNonDéposéeError);

      expect(publishEvent).not.toBeCalled();
    });
  });

  describe('Quand la demande est déjà acceptée', () => {
    const publishEvent = jest.fn();

    it('doit émettre une erreur', () => {
      expect(() =>
        accepter(
          {
            demandeId,
            status: 'acceptée',
          },
          publishEvent
        )({ acceptéeLe, acceptéePar })
      ).toThrowError(DemandeDéjàAcceptéeError);

      expect(publishEvent).not.toBeCalled();
    });
  });
});

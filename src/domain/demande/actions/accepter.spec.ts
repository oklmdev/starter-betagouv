import { accepter, DemandeNonDéposéeError, DemandeDéjàAcceptéeError } from '.';
import { DemandeAcceptée } from '../../../events';

describe('accepter(Demande)', () => {
  const acceptéeLe = 123456;
  const acceptéePar = 'user123';
  const demandeId = 'demande123';

  describe('Quand la demande est juste déposée', () => {
    const publishEvent = jest.fn();

    it('doit émettre un événement de type DemandeAcceptée', () => {
      accepter({
        aggregateId: demandeId,
        getState: () => ({
          demandeId,
          status: 'déposée',
        }),
        publishEvent,
      })({ acceptéeLe, acceptéePar });

      expect(publishEvent).toHaveBeenCalledWith({
        ...DemandeAcceptée({ demandeId, acceptéeLe, acceptéePar }),
        eventId: expect.anything(),
        occurredAt: expect.anything(),
      });
    });
  });

  describe('Quand la demande est nouvelle', () => {
    const publishEvent = jest.fn();

    it('doit émettre une erreur', () => {
      expect(() =>
        accepter({
          aggregateId: demandeId,
          getState: () => ({
            demandeId,
            status: 'nouvelle',
          }),
          publishEvent,
        })({ acceptéeLe, acceptéePar })
      ).toThrowError(DemandeNonDéposéeError);

      expect(publishEvent).not.toBeCalled();
    });
  });

  describe('Quand la demande est déjà acceptée', () => {
    const publishEvent = jest.fn();

    it('doit émettre une erreur', () => {
      expect(() =>
        accepter({
          aggregateId: demandeId,
          getState: () => ({
            demandeId,
            status: 'acceptée',
          }),
          publishEvent,
        })({ acceptéeLe, acceptéePar })
      ).toThrowError(DemandeDéjàAcceptéeError);

      expect(publishEvent).not.toBeCalled();
    });
  });
});

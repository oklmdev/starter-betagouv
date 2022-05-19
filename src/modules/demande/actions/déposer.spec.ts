import { Epoch, getEpoch, NonEmptyishString } from '../../../libs/typeguards';
import { makeFakeUser } from '../../../__test__/fakeUser';
import { Demandeur } from '../../authZ';
import { DemandeDéjàDéposéeError } from '../errors';
import { makeDemandeDéposée } from '../events';
import { déposer } from './déposer';

describe('déposer(Demande)', () => {
  const demandeId = 'demande123';
  const type = 'réclamation' as 'réclamation';
  const justification = 'justification' as NonEmptyishString;
  const déposéePar = makeFakeUser() as Demandeur;
  const déposéeLe = 12345 as Epoch;

  describe('Quand la demande est nouvelle', () => {
    const publishEvent = jest.fn();

    it('doit émettre un événement DemandeDéposée', () => {
      déposer({
        aggregateId: demandeId,
        getState: () => ({
          demandeId,
          status: 'nouvelle',
        }),
        publishEvent,
      })({ type, justification, déposéePar, déposéeLe });

      expect(publishEvent).toHaveBeenCalledWith({
        ...makeDemandeDéposée({ demandeId, type, justification, déposéePar: déposéePar.id, déposéeLe }),
        eventId: expect.anything(),
        occurredAt: expect.anything(),
      });
    });
  });

  describe('Quand la demande existe déjà', () => {
    const publishEvent = jest.fn();

    it('doit émettre une erreur DemandeDéjàDéposéeError', () => {
      expect(() =>
        déposer({
          aggregateId: demandeId,
          getState: () => ({
            demandeId,
            status: 'déposée',
          }),
          publishEvent,
        })({ type, justification, déposéePar, déposéeLe })
      ).toThrowError(DemandeDéjàDéposéeError);
    });
  });
});

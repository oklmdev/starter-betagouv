import { getUserIdByKeycloakId } from './getUserIdByKeycloakId';
import { v4 as uuid } from 'uuid';
import { resetDatabase } from '../__test__/resetDatabase';
import { publish } from '../eventStore';
import { UtilisateurInscritViaKeycloak } from '../../events';

describe('getUserIdByKeycloakId', () => {
  const keycloakId = uuid();

  describe('when the keycloakId is present in the db', () => {
    const userId = uuid();

    beforeAll(async () => {
      await resetDatabase();

      await publish(UtilisateurInscritViaKeycloak({ userId, keycloakId }));
    });

    it('should return the userId for this line', async () => {
      const res = await getUserIdByKeycloakId(keycloakId);
      expect(res).toEqual(userId);
    });
  });

  describe('when the keycloakId is not present in the db', () => {
    beforeAll(async () => {
      await resetDatabase();
    });

    it('should return null', async () => {
      const res = await getUserIdByKeycloakId(keycloakId);
      expect(res).toEqual(null);
    });
  });
});

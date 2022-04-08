import { getUserIdByKeycloakId } from './getUserIdByKeycloakId';
import { v4 as uuid } from 'uuid';
import { postgres } from '../postgres';
import { resetDatabase } from '../__test__/resetDatabase';

describe('getUserIdByKeycloakId', () => {
  const keycloakId = uuid();

  describe('when the keycloakId is present in the db', () => {
    const userId = uuid();

    beforeAll(async () => {
      await resetDatabase();

      await postgres.query('INSERT INTO utilisateur_keycloak VALUES ($1, $2)', [userId, keycloakId]);
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

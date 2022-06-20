import { getUuid } from '../../../libs/getUuid';
import { postgres } from '../../dependencies/postgres';
import { resetDatabase } from '../../dependencies/__test__/resetDatabase';
import { getDemande } from './getDemande.query';

describe('getDemande', () => {
  const demandeId = getUuid();
  const type = 'type';
  const justification = 'justification';
  const status = 'status';
  const déposée_le = 12345678;
  const déposée_par = getUuid();

  describe('quand la demande est présente dans la base', () => {
    describe("quand la demande n'est pas acceptée", () => {
      beforeAll(async () => {
        await resetDatabase();

        await postgres.query('INSERT INTO demandes VALUES ($1,$2,$3,$4,$5,$6)', [
          demandeId,
          type,
          justification,
          status,
          déposée_le,
          déposée_par,
        ]);
      });

      it('doit retourner un objet avec les details de la demande', async () => {
        const demande = await getDemande(demandeId);

        expect(demande).toMatchObject({
          id: demandeId,
          justification,
          status,
        });
      });
    });

    describe(`quand la demande est acceptée`, () => {
      const acceptéeLe = Date.now();

      beforeAll(async () => {
        await resetDatabase();

        await postgres.query('INSERT INTO demandes VALUES ($1,$2,$3,$4,$5,$6,$7)', [
          demandeId,
          type,
          justification,
          status,
          déposée_le,
          déposée_par,
          acceptéeLe,
        ]);
      });

      it('doit retourner un objet avec les details de la demande dont la date acceptéeLe', async () => {
        const demande = await getDemande(demandeId);

        expect(demande).toMatchObject({
          id: demandeId,
          justification,
          status,
          acceptéeLe,
        });
      });
    });
  });

  describe('quand la demande est inconnue', () => {
    beforeAll(async () => {
      await resetDatabase();
    });

    it('doit retourner null', async () => {
      const demande = await getDemande(demandeId);

      expect(demande).toBeNull();
    });
  });
});

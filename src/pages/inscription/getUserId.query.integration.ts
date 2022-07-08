import { getUserId } from './getUserId.query';
import { publish } from '../../dependencies/eventStore';
import { FauxUtilisateurInscrit } from '../../domain/FauxUtilisateurInscrit';
import { resetDatabase } from '../../dependencies/__test__/resetDatabase';

describe('getUserId', () => {
  it("doit retourner une liste d'id d'utilisateur", async () => {
    await resetDatabase();
    await publish(FauxUtilisateurInscrit({ userId: '123', nom: 'Pierre', role: 'administrateur' }));
    await publish(FauxUtilisateurInscrit({ userId: '345', nom: 'Jacques', role: 'demandeur' }));
    const result = await getUserId('123');
    expect(result).toBe(true);
    const resultBis = await getUserId('123342');
    expect(resultBis).toBe(false);
  });
});

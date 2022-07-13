import { isFauxUtilisateurIdAvailable } from './isFauxUtilisateurIdAvailable.query';
import { publish } from '../eventStore';
import { FauxUtilisateurInscrit } from '../../domain/FauxUtilisateurInscrit';
import { resetDatabase } from '../__test__/resetDatabase';

describe('isFauxUtilisateurIdAvailable', () => {
  it('doit retourner true si userId est libre, false si userId est pris', async () => {
    await resetDatabase();

    await publish(FauxUtilisateurInscrit({ userId: '123', nom: 'Pierre', role: 'administrateur' }));

    expect(await isFauxUtilisateurIdAvailable('123')).toBe(false);
    expect(await isFauxUtilisateurIdAvailable('456')).toBe(true);
  });
});

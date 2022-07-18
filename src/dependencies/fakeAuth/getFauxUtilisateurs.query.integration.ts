import { resetDatabase } from '../__test__/resetDatabase';
import { getFakeUsers } from './getFauxUtilisateurs.query';
import { publish } from '../eventStore';
import { FauxUtilisateurInscrit } from '../../events';

describe('getFauxUtilisateurs', () => {
  it('doit retourner une liste de faux utilisateur inscrit', async () => {
    await resetDatabase();

    await publish(FauxUtilisateurInscrit({ userId: '123', nom: 'Pierre', role: 'administrateur' }));
    await publish(FauxUtilisateurInscrit({ userId: '345', nom: 'Jacques', role: 'demandeur' }));

    const result = await getFakeUsers();
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { userId: '123', nom: 'Pierre', role: 'administrateur' },
        { userId: '345', nom: 'Jacques', role: 'demandeur' },
      ])
    );
  });
});

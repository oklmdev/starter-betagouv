# Bienvenue !

Vous trouverez sur votre droite l'application qui tourne, jouez avec !

Vous pouvez aussi voir le code et le changer, les changements seront répercutés en direct. Par exemple, changer le slogan de la page d'accueil en ouvrant [src/pages/accueil/AccueilPage.tsx](./src/pages/accueil/AccueilPage.tsx).

## Tutoriel

Afin de vous familiariser avec le code en place, nous vous proposons de vous accompagner dans l'ajout d'une nouvelle fonctionnalité.

### Specs

Actuellement, il est possible pour un contrevenant de déposer une demande de réclamation.

Le cas que nous allons mettre en place est celui de la rétractation d'une demande de réclamation.

- Le contrevenant doit être authentifié pour rétracter une demande
- Seule une demande déposée peut-être rétractée

### Domain

- Ouvrir le fichier [Demande.spec.ts](./src/domain/demande/Demande.spec.ts) dans le dossier `src/domain`
- Ajouer la suite de test `quand il reçoit un événement DemandeRétractée` :
  ```typescript
  describe('quand il reçoit un événement DemandeRétractée', () => {
    it('doit retourner un status rétractée', () => {
      expect(
        buildState(
          { status: 'nouvelle'},
          DemandeRétractée()
        )
      ).toEqual({
        status: 'rétractée',
      });
    });
  });
  ```
- Nous devons maintenant créer l'événement `DemandeRétractée`

### Évènement

### Page

### Table

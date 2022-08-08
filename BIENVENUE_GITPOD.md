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

### Procédure
// TODO On refactorise et makeAggregate.ts (pour comprendre)
// TODO Créer le test sur makeDemande
// TODO Créer l'action `rétracterDemande`
// TODO "On s'attends à ce que la rétractation soit disponible dans les actions possible de l'aggrégat, on modifie donc le test sur l'aggrégat."

- Ouvrir le fichier [Demande.spec.ts](./src/domain/demande/Demande.spec.ts) dans le dossier `src/domain`
- Ajouter la suite de test `quand il reçoit un événement DemandeRétractée` :
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
- Dans le dossier `events` ajouter le fichier `DemandeRétractée.ts`, et y ajouter ce contenu :
  ```typescript
  import { BaseDomainEvent, makeDomainEvent } from '../libs/eventSourcing';
  
  export type DemandeRétractée = BaseDomainEvent & {
    type: 'DemandeRétractée';
    payload: {};
  };
  
  export const DemandeRétractée = (payload: DemandeRétractée['payload']): DemandeRétractée =>
  makeDomainEvent({
    type: 'DemandeRétractée',
    payload
  });
  ```
- Ajouter `export * from './DemandeRétractée';` dans [events/index.ts](./src/events/index.ts)
- Dans le fichier [Demande.spec.ts](./src/domain/demande/Demande.spec.ts) dans le dossier `src/domain`, importer `DemandeRétractée` (`from '../../events';`), puis ajouter le payload `{}` attendu par `DemandeRétractée()`
- Le test ne passe pas, car le statut n'a pas été changé : `nouvelle` alors que le test s'attend à recevoir `rétractée`, il faut donc implémenter ce comportement dans [Demande.ts](./src/domain/demande/Demande.ts) dans le même dossier que le test :
  - Ajouter la valeur de `statuts` `rétractée` dans le type `DemandeState`
  - Ajouter le case `DemandeRétractée` :
    ```typescript
    case 'DemandeRétractée':
      return { ...state, status: 'rétractée' };
    ```
  - Voici l'état final du fichier [Demande.ts](./src/domain/demande/Demande.ts) :
    ```typescript
        import { makeAggregate } from '../../libs/eventSourcing/makeAggregate';
        import { DomainEvent } from '../../libs/eventSourcing/types/DomainEvent';
        import { accepter, déposer } from './actions';
        export type DemandeState = { status: 'nouvelle' | 'déposée' | 'acceptée' | 'rétractée' };
        export function buildState(state: DemandeState, event: DomainEvent): DemandeState {
          switch (event.type) {
            case 'DemandeDéposée':
              return { ...state, status: 'déposée' };
            case 'DemandeAcceptée':
              return { ...state, status: 'acceptée' };
            case 'DemandeRétractée':
              return { ...state, status: 'rétractée' };
            default:
              return state;
        }
      }
      export const makeDemande = makeAggregate({
        initialState: { status: 'nouvelle' },
        buildState,
        actions: { accepter, déposer },
      });
    ```
  - Le test devrait maintenant passer.

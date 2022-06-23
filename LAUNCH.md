# Installation

## Lancer l'application en local

```
yarn
yarn db             # lance la base postgres via docker
yarn migrate        # crée les tables de données
yarn watch          # lance l'application

open http://localhost:3000
```

## Lancer les tests automatisés

```
yarn db:test        # lance la base postgres de test via docker
yarn test:watch     # lance les tests en mode watch

open http://localhost:6006
```

## Travailler sur le vues avec storybook

```
yarn storybook

open http://localhost:6006
```

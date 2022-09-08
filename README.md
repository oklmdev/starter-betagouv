<p align="center">
  <img alt="logo de SPACE" src="https://github.com/oklmdev/starter-betagouv/blob/master/src/assets/images/pas-si-vite.svg" width="30%"/>
</p>

<p align="center"><i>🚀 Retirer les frictions lors du démarrage d'un projet betagouv 🚀</i></p>

Vous trouverez ici un chantier ouvert de "starter" pour démarrer des nouveaux projets betagouv en Typescript/Node.

En développant des produits au sein de betagouv, nous nous sommes rendus compte que nous recodions les mêmes briques / intégrations pour chaque produit. Et si nous mutualisions ?

_C'est encore le début et il n'y a pas grand chose d'utilisable pour le moment. Le chantier est ouvert à toutes les contributions, propositions, idées..._

## Pourquoi un starter spécial betagouv ?

Il existe suffisamment de points communs entre nos projets pour que nous puissions aller plus loin que les starters génériques qui sont disponibles.

Points communs aux Startups d'Etat :

- Une démarche exploratoire guidée par l'impact, ce qui implique:
  - Une mise en oeuvre rapide d'une première version,
  - Des mesures et des ajustements fréquents en cours de route,
    - et donc une dette technique qui a tendance à s'accumuler...
  - Des phases d'accélération, où la vélocité de développement devient critique (et la dette technique se fait sentir),
- Une équipe avec une taille restreinte
  - Intrapreneur, développeurs, chargés de déploiement, designers... travaillant main dans la main
  - Des développeurs avec des responsabilités larges (application, data, déploiement, sécurité...)
- Un produit qui fait le lien entre des usagers et l'administration
- Un service qui s'intègre avec d'autres startups betagouv ou des services de l'administration
- Des [standards](https://doc.incubateur.net/communaute/gerer-sa-startup-detat-ou-de-territoires-au-quotidien/je-fais-des-choix-technologique/standards-de-qualite-beta.gouv.fr) [de développement](https://doc.incubateur.net/communaute/travailler-a-beta-gouv/bienvenue/embarquement-dev), d'accessibilité, et de sécurité.
  - Hébergement sur des infrastructures FR ou EU (problématiques RGPD)
  - Transparence & participation ouverte (open source)
- ...

Nous pensons que chaque équipe souhaite développer **sereinement** des produits **durables** (robustes et maintenables) et **évolutifs**.

## Que proposer dans ce starter ?

- Les briques typiques
  - Authentification
    - intégration Keycloak
    - FranceConnect, ProConnect, AgentConnect, ...
    - lien magiques
  - Gestion des droits par role/ressources et zones à accès restreint
  - Envoi de mails
  - Gestion de fichiers
  - Import/export de données
  - Génération de PDF / Excel
  - ...
- Des briques spécifiques betagouv
  - DSFR
  - Intégration des services tiers
    - API Entreprise, data.gouv.fr, ...
  - ...
- Tout ce qu'il faut pour déployer régulièrement et sereinement
  - CI/CD
    - exemple de déploiement sur les PAAS Clever Cloud ou Scalingo
  - Tests automatisés avec Jest
  - Storybook
  - ...
- Une architecture qui est optimisée pour le changement
  - Découplage du code métier et de l'infra (db, api tiers, ...)
  - Un modèle de persistence de données flexible
  - Une orchestration sans framework (pour garder le contrôle)
  - ...

Le tout illustré dans un magnifique faux produit betagouv [S.P.A.C.E.](./UNIVERS.md).

Tu as des idées ? Tu développes un produit en démarrage et tu es intéressé par ce starter ?  
Retrouve-moi sur mattermost **@pierre-antoine.duchateau** !

Tu veux tester ?[![Ouvrir dans une conteneur gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/oklmdev/starter-betagouv/tree/master)

## Ceci n'est pas...

- une solution universelle et parfaite pour tous les projets
  - des choix ont été fait selon l'opinion des auteurs
- un démonstrateur de technos dernier cri
- un projet officiel
- fini

## Contributeurs

- Pierre-Antoine Duchâteau _mainteneur_ ([Potentiel](https://github.com/MTES-MCT/potentiel))
- Romain Cambonie ([Immersion Facilitée](https://github.com/betagouv/immersion-facile), ex-[Conseilleur Numérique](https://github.com/anct-cnum))
- Clément Charles ([@ClementCHA](https://github.com/ClementCHA))
- Jérôme Burkard ([Immersion Facilitée](https://github.com/betagouv/immersion-facile))
- Marc Gavanier ([Conseilleur Numérique](https://github.com/anct-cnum))
- Rejoignez-nous !

Pour les bugs/remarques/discussion, n'hésitez pas à ouvrir une issue.

Toute PR est la bienvenue !

## Installation et lancement

Voir le fichier [LAUNCH.md](./LAUNCH.md) _en construction_

## Licence

Voir le fichier [LICENSE](./LICENSE) du dépot.

## Changelog

Nous nous retrouvons un soir par semaine pour peaufiner le positionnement, avancer lentement mais surement, discuter des choix techniques (un mélange de [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding) et [yak shaving](https://en.wiktionary.org/wiki/yak_shaving) :D ), et parfois faire un peu de code...

Depuis peu, Pierre-Antoine et Clément consacrent quelques heures chaque jour pour donner un coup de boost au projet !

### Next up

- [ ] Inscription d'un usager

### Juin 2022

- [x] fausse authentification (pour les dev/démo)
- [x] Page d'accueil de SPACE
- [x] Simplification de l'arborescence (il y a encore de la marge !)
- [x] thème DSFR via [react-dsfr](https://github.com/dataesr/react-dsfr) (merci à eux !)
- [x] thème DSFR pour la page de login de keycloak

### Mai 2022

- [x] Gestion basiques des droits
- [x] Intégration keycloak

### Avril 2022

- [x] Transactions simples
- [x] Reconstruction des tables à partir de l'historique
- [x] Mise à jour de tables de projections déclenchée par les événements
- [x] Bus d'événements
- [x] Base postgres (instance docker + client)

### Démarrage

- [x] Storybook
- [x] Jest
- [x] Prettier
- [x] Eslint
- [x] Base typescript (tsconfig)

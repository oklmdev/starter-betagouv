# oklm
"au calme": *Un code sain pour un dev serein.*

> Hello !  
>
> Nous sommes un groupe de développeurs de [betagouv](https://beta.gouv.fr), et nous mettons notre énergie en commun pour identifier les pratiques utiles pour développer __sereinement__ des produits __durables__ (robustes et maintenables).
>
> Tu trouveras ici, un chantier d'application réaliste en typescript/nodejs, mettant en oeuvres ces pratiques, ainsi que les discussions autour des différents choix que nous faisons.
>
> N'hésite pas à rejoindre les discussions via une [issue](https://github.com/oklmdev/oklm/issues/new/choose) ou encore une [PR](https://github.com/oklmdev/oklm/compare) !  
>  
> A très vite !
-----

### Quelles pratiques pour être oklm ?

- Découplage métier / infra
    - *"Je change de lib sans toucher au code métier."*
    - pour limiter notre dépendance à des libs tiers (API, base de données, ...)
    - isoler le métier pour mieux le concevoir
- Découplage des domaines métiers entre eux
    - *"Je change les règles d'un contexte métier sans toucher aux autres."*
    - séparer les responsabilités indépendantes pour mieux les concevoir
- Découpler les données du modèle de données
    - *"Je pousse un nouveau schéma de BDD en prod, sans le stresse de la migration."*
    - pour se sentir libre de changer de modèle de données, même avec un système en production


Mais aussi
- Ne pas être dépendant d'un framework
    - les frameworks introduisent des patterns utiles mais au coût d'une inversion du contrôle (le framework appelle mon code, je ne peux pas le contourner)
    - l'alternative proposée est d'introduire les patterns via des conventions, sans contraintes fortes (*ie* sans API)
- S'outiller pour améliorer l'expérience de développement
    - intégration continue et déploiement continu (CI/CD)
    - analyse de code (typage, linters, autoformattage, visualisation, ...)
    - tests pour aider à la conception et aussi éviter les régressions
    - éventuellement, un peu de génération de code (si boilerplate répétitif)

### Pourquoi adopter ces pratiques ?

- Livrer vite et souvent
- Pouvoir être responsable de la prod sans perdre sa sérennité
- Créer un produit qui sera facile à reprendre par les contributeurs futurs
- Un outil pour toute l'équipe
    - l'application répond aux besoins métier et en épouse les contours
    - le développement comme une conversation entre toutes les parties prenantes

### Comment est-ce que je me servirais d'oklm ?

- Comme starter pour mon nouveau projet typescript/node
- Pour avoir des exemples fonctionnels concrets de certaines pratiques et d'usage de certaines libs
- Comme support de discussion
    - partir d'un fork pour proposer un changement, une intégration, etc.

### Oklm n'est pas...

- une solution universelle et parfaite pour tous les projets
    - des choix ont été fait selon l'opinion des auteurs
- un démonstrateur de technos dernier cri
- fini et n'est pas destiné à l'être
    - mais nous visons que le "coeur" du code puisse être suffisamment stable pour être utilisé dans des situations réelles dans le futur.

# Utilisation

## Prérequis

[Node](https://nodejs.org/)  
[Yarn](https://yarnpkg.com/)

## Technos utilisées

<details>
<summary> Clicker pour ouvrir </summary>
<br>

### Languages & Frameworks

- [TypeScript](https://www.typescriptlang.org/) is an open-source language which builds on JavaScript
- [React] (mais ça pourrait être intéressant de donner des exemples de vue en Angular, Vue, Svelte, Vanilla, ...)

### Tools

#### Cli

- [Jest](https://jestjs.io/) is a JavaScript Testing Framework
- [Eslint](https://eslint.org/) with plugins :
  - [typescript](https://github.com/typescript-eslint/typescript-eslint)
  - [prettier](https://github.com/prettier/eslint-config-prettier)
  - [jest](https://github.com/jest-community/eslint-plugin-jest)
- [Prettier](https://prettier.io/)

#### CI

- [Github Actions](https://docs.github.com/en/actions)

#### Deploiement

Nous recommandons de déployer sur un [PaaS](https://fr.wikipedia.org/wiki/Platform_as_a_service).

- [Clevercloud](https://www.clever-cloud.com/)
- [Scalingo](https://www.scalingo.com/)

- A venir: exemples Terraform, Docker, etc.


</details>

## Installation

- Run `yarn install` to install dependencies.


## Licence

Voir le fichier [LICENSE](./LICENSE) du dépot.

## Notes
[HackMD](https://hackmd.io/j6F14DDpTMG9-rEFCgc3tw)

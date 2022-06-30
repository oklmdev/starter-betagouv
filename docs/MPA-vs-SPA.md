# MPA vs SPA ?

Si vous venez du monde React vous avez peut-être l'habitude du mode SPA: une application js front gère l'interface utilisateur et fait des appels à une API pour envoyer/récupérer des données coté back.

// Schéma qui montre que le premier appel retourne du html basique et un gros bundle JS qui crée la UI. Les appels suivants se font sous forme de JSON

Ce mode de fonctionnement nécessite un certain nombre de briques côté front

- les composants react visuels
- une gestion de l'état partagé (Redux, MobX, Context...)
- une synchronisation front-back (fetch, react-query, ...)
- un router

côté back

- un router
- une base de données (et des requêtes)

// schéma avec le détail de toutes ces briques front/back

En mode, MPA, tous les appels passent par le serveur qui retourne du html.

il n'y a plus rien coté front, et coté back

- un routeur
- une base des données (et des requêtes)
- les composants react visuels

// Schéma d'une requête typique qui part du browser, qui arrive au routeur back, qui fait un appel à la base de données, qui passe les données au composant React, qui est transformé en html et retourné au navigateur.

On a économisé

- un routeur
- la synchronisation front-back (ie les aller-retour via l'API)
- la gestion de l'état partagé

Ce ne sont pas des briques triviales.

Avantage propres au SPA

- Possibilité de faire des transitions entre les pages sans rechargement complet
- Conserver un état local entre les changements de page (ex: player média qui tourne)
- Fonctionnement offline

Avantages du MPA:

- complexité moindre (cf briques économisées)

### Et pour l'interactivité coté navigateur ?

Il est parfois intéressant d'avoir un comportement riche coté navigateur: autocompletion, validation de champs de formulaire, etc.

Pour cela, le html seul ne suffit pas, il faut du code js.

Il est possible d'ajouter de l'interactivité (setState, useEffect...) en produisant un bundle js qui sera envoyé coté front avec le html et prendra le controle de la page (ajout de listeners sur le DOM).

// Schéma de l'hydration

# Decoupling Data

Les symptômes d'un couplage trop fort au niveau de la donnée:
- Au démarrage, réunions interminables à modéliser le métier pour aboutir à un schéma de données
- Le développeur ne peut pas avancer avant de s'accorder avec le métier sur le modèle de données
- Les tables ont des colonnes qui ne sont présentes dans aucune requête, des données qui ne sont affichées dans aucune vue
- Présence de tables de liaison pour des relations many-to-many, alors que dans les données en prod, on n'a que des liens 1-1 ("qui peut le plus peut le moins !")
- Les devs s'énervent parce que le métier "ne nous a pas prévenu que ce cas de figure pouvait arriver"

### Proposition:
Séparer la notion de source de vérité (les faits) de la notion de données à afficher (les vues).

La source de vérité, c'est ce qui s'est passé avec certitude, sans interprétation possible. Elle est immuable. C'est une source de certitude.

Les vues sont des projection de la source de vérité adaptée aux besoins, déterminés à un moment donné, de l'utilisateur.
On a décidé d'afficher une partie des choses, d'une certaine manière, dans une certain contexte et ça peut changer avec notre compréhension des besoins de l'utilisateur.
On est dans le monde de l'incertain.

On peut décrire le passage de la source de vérité aux vues comme une fonction de transfert (`vue = f(faits)`).

<img src='./decoupling-data/1 - Truth - transfer - view.drawio.svg' style="background-color: white; padding: 20px;"/>

Plutôt que de stocker les faits sous la forme de ressources qui ont des propriétés (ex: `User(id, name, age)`), stockons les événements qui énoncent des choses qui se sont passées dans la vie de notre application (`CustomerRegistered(customerId, name, age)`).

Les événements ont un type (une action qui a un sens métier et au participe passé. Par exemple, `CustomerRegistered`) des métadonnées (le `payload`) qui suivent un schéma propre au type (stocké sous forme de json).

Ils sont stockés dans un event store (une simple table `(id, type, payload, date d'occurence)`)

### Dégré 0 : utiliser les événements eux-mêmes pour remplir une vue

On peut faire une simple requête pour récupérer tous les événements dans le store et que ça soit la vue qui gère la construction de son état.

<img src='./decoupling-data/2 - Simply pass events to view.drawio.svg' style="background-color: white; padding: 20px;"/>

Avantage:
- simplicité de requêtage

Inconvénients
- envoi de trop de données coté vue
- envoi de données confidentielles coté vue
- traitement complexe coté vue (mettre à plat historique => état à date)

### Degré 1

On peut concevoir une query coté back pour ne récupérer que les événements appropriés (par exemple, uniquement les `CustomerRegistered` ou alors tous les événements pour un certain `customerId`).

<img src='./decoupling-data/3 - Use query to filter events.drawio.svg' style="background-color: white; padding: 20px;"/>

Avantage:
- envoi de moins de données coté vue

Inconvénients
- envoi de données confidentielles coté vue (payload complet)
- traitement complexe coté vue (mettre à plat historique => état à date)

**Conceptuellement, on voudra mettre à plat l'historique pour obtenir un état à date, ça peut être fait de plusieurs manières**

L'état à date peut être du html, ou alors un DTO qui va ensuite être transformé en html, ou alors un projection qui va être requêtée pour faire un DTO, ...
On a la liberté de placer le curseur à plusieurs endroits.

Plus loin
- on fait events->DTO coté back, la vue est dumb
- on utilise une projection (un cache) pour simplifier les requêtes (on déplace la logique de mise à plat de l'historique au moment de l'écriture plutot qu'à la lecture)
- cas où on mets à jour un fichier à plat
- cas où on mets à jour l'état d'un service tiers (moteur de recherche)
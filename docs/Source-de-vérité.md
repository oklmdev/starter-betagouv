Le fait d'établir le schéma au début du projet (avant de persister des données), force à penser aux aspects suivants:

- est-ce que j'ai tout ce que je veux retenir ?
- est-ce que j'ai tout ce que je veux afficher ?
- quelles sont les relations entre mes entités ?
- comment vais-je former mes requêtes ?
- est-ce que les requêtes seront optimisées ?
  alors même qu'il y a une incertitude maximale autour du périmètre fonctionnel du projet.

C'est contraire à la (ou du moins contre-productif dans une) démarche exploratoire, qui consiste à développer juste ce qu'il faut pour tester nos hypothèses, observer l'impact effectif, et former de nouvelles hypothèses à tester.

Dans cette démarche, tout ce qui est codé dans un cycle est de nature précaire. Si l'hypothèse n'est pas validée, ce code n'a plus lieu d'être. Il est donc plus intéressant de limiter la quantité de code balance (ie valider un moins grand scope fonctionnel, moins d'hypothèses par cycle) et donc privilégier des cycles plus courts.

La création d'un schéma de base est un processus long et coûteux, et donc risqué s'il est bâti sur trop d'hypothèses. Il devrait arriver en dernier, pour ne solidifier que les hypothèses (ie les fonctionnalités) qui ont été validées par l'observation.

Mais comment implémenter une application sans schéma de base de données ? Comment persister les données pour une application qui doit être mise en prod ?

---

Prenons du recul: il y a une distinction à faire entre les données qui correspondent aux _faits_ (Vérité) et les données qui en sont dérivées pour les besoins de l'application, qu'on pourrait appeler _vues_.

`vues = f(faits)`

Les **_faits_** (ex: une demande de changement de nom a été déposée) **ne changent pas** au fil de l'évolution de notre produit.

Les **_vues_ peuvent changer** (ex: nous souhaitons désormais traiter uniquement les demandes qui ont été déposées depuis moins d'un mois).

Dans un schéma classique, les faits et les vues se trouvent dans les mêmes tables. Il y a un amalgame.

Lors d'une action (ex: soumission d'un formulaire valide), nous écrivons dans la ou les tables impactées. Ces tables sont ensuite requêtées pour les besoins de l'affichage, d'une API, l'application de règles, etc.

En réalité, nous n'avons besoin que de persister les faits. Si un utilisateur dépose un demande de changement de nom, nous souhaitons persister "un utilisateur a déposé une demande de changement de nom" (ainsi que les données correspondantes: identifiant de l'utilisateur, nouveau nom, date de la demande, ...).

Nous pouvons donc imaginer stocker tous ces événements dans une table dédiée, à la manière d'un log.

Cette table contiendrait:

- une colonne `type`
  - ex: "demande déposée"
- une colonne `payload`
  - les méta-données sous la forme d'un json avec des propriétés spécifiques à ce type d'événement: `déposée par`, `justification`, `fichier joint`, ...)
- une colonne avec un `timestamp`
  - la date à laquelle cet événement est émis

Elle serait par ailleurs immutable (append-only). On peut ajouter des faits dans l'historique mais pas modifier le passé, ce qui introduirait le risque de perdre de l'information.

Toutes les données nécessaires aux vues (par exemple, le nom d'un usager) peuvent être déduites des événements contenus dans l'historique.

Comment ?

Rentrons dans les considérations d'implémentation.
Reprenons le point de départ:

`vues = f(faits)`
qui devient
`vues = f(événements)`

---

Typiquement, une action (ex: soumission d'un formulaire) déclenche une écriture dans une ou plusieurs tables et l'interface est construite à partir de requête sur ces tables.

Ce n'est pas clair si le schéma de données vient d'un besoin de stocker de l'information (sans perte si possible) ou de besoins d'affichage des pages.  
Si c'est pour stocker de l'information, est-ce qu'on essaye de tout consigner ou bien on accepte la perte d'une partie de l'information ?  
Si c'est piloté par les besoins d'affichage, est-ce qu'on peut rajouter à posteriori des nouvelles données ? Mais si on a oublié de stocker ces données ?

En faisant des écritures directement en base, on perd une partie de l'information. Ce qui s'est passé n'est pas "insertion dans la table users" mais plutot "Un utilisateur s'est inscrit". On perds du contexte.

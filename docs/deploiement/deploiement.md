# A propos

Dans sa version la plus simple il n'y a qu'un seul environment de production deployé sur [Scalingo](https://scalingo.com/fr)
Scalingo est un [PaaS](https://scalingo.com/fr/blog/paas-guide-complet) souverain français qui satisfais bien les exigences de BetaGouv.

# Déployer ma copie du starter en moins d'une heure.

## Prérequis

- Avoir un compte sur [github](https://github.com/) et être connecté.

## 1. Utiliser ce template comme point de départ du dépot

- Allez sur [https://github.com/oklmdev/starter-betagouv-template](https://github.com/oklmdev/starter-betagouv-template) et cliquez sur le bouton 'Use this template' en haut à droite

![Use this template](use_this_template.png)

- Saisissez le nom du repo à créer puis valider la création

# 2. Créer un compte sur scalingo

- Allez sur la [page d'inscription scalingo](https://auth.scalingo.com/users/sign_up) et créez votre compte (pas besoin de mettre de moyen de paiement pour l'instant :) )

# 3. Créer un token api sur scalingo.

- Allez sur [vos paramètres de compte, section 'Tokens Api'](https://dashboard.scalingo.com/account/tokens) et cliquez sur 'Ajouter'.
- Donner un nom à votre token api puis copiez-collez sa valeur pour pouvoir la retrouver ensuite
  - Attention ne la partagez avec personne ! Ce token ne sera plus visible ensuite et permet un accès complet à votre compte Scalingo.

![scalingo_token.png](scalingo_token.png)

# 4. Renseigner le token api dans les secrets github

- Allez dans les 'Settings' du dépot de votre projet qui contient le fork du starter. (url_du_dépot/settings)
- Sélectionnez la catégorie 'Secrets' puis 'actions' dans le menu de gauche

![repository_secrets.png](repository_secrets.png)

- Créez un 'New Repository Secret' avec
  - pour nom 'SCALINGO_API_TOKEN'
  - pour valeur le token api scalingo copié précédement.
- Validez en cliquant sur 'Add Secret'

![token_as_secret.png](token_as_secret.png)

# 5. Lancer l'action de déploiement

- Allez dans les 'Actions' du dépot de votre projet (url_du_dépot/actions)
- Validez l'activation des actions en cliquant sur 'I understand my workflows, go ahead and enable them'
- ![activate workflows.png](activate_workflows.png)

- Cliquez sur 'Déployer sur Scalingo' dans la liste des Workflows
  - puis cliquez sur le bouton 'Run workflow'
  - puis encore sur la confirmation Run workflow avec l'option 'Use workflow from' active sur 'master'

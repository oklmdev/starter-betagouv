export class UtilisateurDéjàInscritError extends Error {
  constructor() {
    super('Un utilisateur est déjà inscrit pour cet identity provider.');
  }
}

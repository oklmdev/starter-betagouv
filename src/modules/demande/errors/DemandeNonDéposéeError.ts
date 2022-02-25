export class DemandeNonDéposéeError extends Error {
  constructor() {
    super("La demande ne peut être acceptée avant d'être déposée.");
  }
}

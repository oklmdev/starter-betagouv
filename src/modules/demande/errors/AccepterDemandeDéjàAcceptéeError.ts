export class AccepterDemandeDéjàAcceptéeError extends Error {
  constructor() {
    super('La demande est déjà acceptée.');
  }
}

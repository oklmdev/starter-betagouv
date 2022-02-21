export class DemandeDéjàAcceptéeError extends Error {
  constructor() {
    super('La demande est déjà acceptée.');
  }
}

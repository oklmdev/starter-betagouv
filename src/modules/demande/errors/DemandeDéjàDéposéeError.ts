export class DemandeDéjàDéposéeError extends Error {
  constructor() {
    super('Une demande avec cet id a déjà été déposée.');
  }
}

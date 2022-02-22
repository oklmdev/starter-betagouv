export class UnauthorizedError extends Error {
  constructor() {
    super('Operation interdite');
  }
}

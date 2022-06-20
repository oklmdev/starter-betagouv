declare module Express {
  // eslint-disable-next-line
  export interface Request {
    user: { id: string; role: 'administrateur' | 'demandeur' };
    kauth: any;
  }
}

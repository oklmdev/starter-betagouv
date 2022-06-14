declare module Express {
  // eslint-disable-next-line
  export interface Request {
    user: { id: string; role: string };
    kauth: any;
  }
}

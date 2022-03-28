declare module Express {
  // eslint-disable-next-line
  interface Request {
    user: { id: string };
    kauth: any;
  }
}

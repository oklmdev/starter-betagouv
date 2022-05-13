import { User as OklmUser } from '../modules/authZ';

declare module Express {
  // eslint-disable-next-line
  interface Request {
    user: OklmUser;
    kauth: any;
  }
}

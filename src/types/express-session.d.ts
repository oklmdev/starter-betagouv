import session from 'express-session';
import { User } from '../modules/authZ';

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

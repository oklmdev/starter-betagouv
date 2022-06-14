import session from 'express-session';
import { User } from '../domain/authZ';

declare module 'express-session' {
  export interface SessionData {
    user: User;
  }
}

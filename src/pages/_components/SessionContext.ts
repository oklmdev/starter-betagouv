import React from 'react';

export type Session =
  | {
      isLoggedIn: false;
    }
  | {
      isLoggedIn: true;
    };

export const SessionContext = React.createContext<Session>({ isLoggedIn: false });

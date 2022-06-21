import React from 'react';

export const SessionContext = React.createContext<{ isLoggedIn: boolean }>({ isLoggedIn: false });

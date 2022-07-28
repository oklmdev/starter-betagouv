import * as React from 'react';
import { useContext } from 'react';
import { SessionContext } from '../SessionContext';

export const AccueilLinks = (): JSX.Element => {
  const { isLoggedIn } = useContext(SessionContext);

  return (
    <>
      {isLoggedIn ? (
        <div className='button'>
          <a href='/demandes'>Voir mes demandes</a>
        </div>
      ) : (
        <>
          <div className='button'>
            <a href='/login.html'>Me connecter</a>
          </div>
          <div className='button'>
            <a href='/inscription.html'>M'inscrire</a>
          </div>
        </>
      )}
    </>
  );
};

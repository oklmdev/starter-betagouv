import dotenv from 'dotenv';
dotenv.config();

const throwIfUndefined = (variableName: string) => {
  const value = process.env[variableName];
  if (!value) throw new Error(`Expected ${variableName} to be Defined`);
  return value;
};

const AUTHN = process.env.AUTHN;

export const USE_KEYCLOAK: boolean = AUTHN === 'keycloak';

export const KEYCLOAK_SERVER = USE_KEYCLOAK && throwIfUndefined('KEYCLOAK_SERVER');
export const KEYCLOAK_USER_CLIENT_ID = USE_KEYCLOAK && throwIfUndefined('KEYCLOAK_USER_CLIENT_ID');
export const KEYCLOAK_REALM = USE_KEYCLOAK && throwIfUndefined('KEYCLOAK_REALM');
export const KEYCLOAK_USER_CLIENT_SECRET = USE_KEYCLOAK && throwIfUndefined('KEYCLOAK_USER_CLIENT_SECRET');

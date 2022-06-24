import dotenv from 'dotenv';
dotenv.config();

const throwIfUndefined = (variableName: string) => {
  const value = process.env[variableName];
  if (!value) throw new Error(`Expected ${variableName} to be Defined`);
  return value;
};

export const KEYCLOAK_SERVER = throwIfUndefined('KEYCLOAK_SERVER');
export const KEYCLOAK_USER_CLIENT_ID = throwIfUndefined('KEYCLOAK_USER_CLIENT_ID');
export const KEYCLOAK_REALM = throwIfUndefined('KEYCLOAK_REALM');
export const KEYCLOAK_USER_CLIENT_SECRET = throwIfUndefined('KEYCLOAK_USER_CLIENT_SECRET');

export const SEED = process.env.SEED;

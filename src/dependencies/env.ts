import dotenv from 'dotenv';
dotenv.config();

const throwIfUndefined = (variableName: string) => {
  const value = process.env[variableName];
  if (!value) throw new Error(`Expected ${variableName} to be Defined`);
  return value;
};

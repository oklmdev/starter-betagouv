import z from 'zod';

type GuardedType<T> = T extends (x: any) => x is infer T ? T : never;

type TypeGuard<Input, Output extends Input> = (value: Input) => value is Output;

export const zCustom = <T extends TypeGuard<unknown, unknown>>(typeguard: T) => {
  return z.custom<GuardedType<T>>(typeguard);
};

export type NonEmptyishString = string & { minLength: 3 };

export const isNonEmptyishString = (str: unknown): str is NonEmptyishString => {
  return typeof str === 'string' && str.length >= 3;
};

export const zNonEmptyishString = zCustom(isNonEmptyishString);

export type Epoch = number & { isEpoch: true };

export function getEpoch(date: Date): Epoch {
  return date.getTime() as Epoch;
}

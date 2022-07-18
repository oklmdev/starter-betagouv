import { getUuid } from '../libs/getUuid';
import { User } from '../domain/Roles';

export const makeFakeUser = (overrides?: Partial<User>): User => {
  return {
    id: getUuid(),
    role: 'demandeur',
    ...overrides,
  };
};

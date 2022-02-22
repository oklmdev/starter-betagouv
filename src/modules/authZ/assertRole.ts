import { UserRole, User, UserWithRole } from '.';
import { UnauthorizedError } from './errors';

export function assertRole<Role extends UserRole>(user: User, roleOrRoles: Role | Role[]): asserts user is UserWithRole<Role> {
  const roles: string[] = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];

  if (!roles.includes(user.role)) {
    throw new UnauthorizedError();
  }
}

export type User = {
  id: string;
  role: string;
};
export type UserRole = 'développeur' | 'administrateur' | 'instructeur' | 'usager';
export type UserWithRole<Role extends UserRole> = User & { role: Role };

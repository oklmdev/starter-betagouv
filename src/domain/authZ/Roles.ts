export const roles = ['administrateur', 'demandeur'] as const;
export type Role = typeof roles[number];

export type User = {
  id: string;
  role: Role;
};

export type Demandeur = User & { role: 'demandeur' };
export type Administrateur = User & { role: 'administateur' };

export function isDemandeur(user: User): user is Demandeur {
  return user.role === 'demandeur';
}

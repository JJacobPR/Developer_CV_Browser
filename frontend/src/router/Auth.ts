export type UserAuth = { roles: Role[]; id: number };

export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  ADMIN: ["delete:users", "create:users", "update:users"] as const,
  USER: ["delete:projects", "create:projects", "update:projects", "view:own-projects"] as const,
} as const;

export const hasPermission = (user: UserAuth, permission: Permission) => {
  return user.roles.some((role) => (ROLES[role] as readonly Permission[]).includes(permission));
};

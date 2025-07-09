export type UserAuth = { roles: Role[]; id: number };

export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  ADMIN: ["delete:users", "create:users", "update:users"] as const,
  USER: ["delete:projects", "create:projects", "update:projects", "view:own-projects"] as const,
} as const;

// This function checks if a user has a specific permission based on their roles.
// It iterates through the user's roles and checks if any of the roles include the specified permission
export const hasPermission = (user: UserAuth, permission: Permission) => {
  return user.roles.some((role) => (ROLES[role] as readonly Permission[]).includes(permission));
};

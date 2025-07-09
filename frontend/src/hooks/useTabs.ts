import type { User } from "models/user";
import { hasPermission, type Role } from "../router/auth";

const useTabs = (loggedUser: User) => {
  if (!loggedUser) {
    return [];
  }

  const baseTabs = [{ label: "Users", value: "" }];

  // Generate tabs based on user permissions
  const addUserTab = hasPermission({ roles: [loggedUser.role] as Role[], id: loggedUser.id as number }, "create:users") ? [{ label: "Add User", value: "admin/add-user" }] : [];
  const myProjectsTab = hasPermission({ roles: [loggedUser.role] as Role[], id: loggedUser.id as number }, "view:own-projects") ? [{ label: "My Projects", value: "my-projects" }] : [];
  const addProjectTab = hasPermission({ roles: [loggedUser.role] as Role[], id: loggedUser.id as number }, "create:projects") ? [{ label: "Add Project", value: "my-projects/add-project" }] : [];

  return [...baseTabs, ...addUserTab, ...myProjectsTab, ...addProjectTab];
};

export default useTabs;

import type { Project } from "./project";

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface StandardUser extends User {
  name: string;
  surname: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
}

export type StandardUserRequest = {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
};

export type StandardUserCreateResponse = {
  id: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

export type StandardUserProjectResponse = {
  id: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
  projectRole: string;
};

export interface StandardUserWithProjects {
  id: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  workRole: string;
  bio: string;
  projects: Project[];
}

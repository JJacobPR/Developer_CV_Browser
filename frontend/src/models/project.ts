import type { TechnologyResponse } from "./technology";
import type { StandardUserProjectResponse } from "./user";

export type ProjectRequest = {
  userId: number;
  name: string;
  companyName: string;
  description: string;
  projectRole: string;
  startDate: string;
  endDate: string;
  technologies: number[];
};

export type Project = {
  projectId: number;
  name: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  createAt: string;
  updatedAt: string;
  users: StandardUserProjectResponse[];
  technologies: TechnologyResponse[];
};

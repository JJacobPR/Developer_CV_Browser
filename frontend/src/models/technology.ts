export type TechnologyType = "FRONTEND" | "BACKEND" | "DEVOPS" | "DATABASE";

export type TechnologyRequest = {
  name: string;
  type: TechnologyType;
};

export type TechnologyResponse = {
  id: number;
  name: string;
  type: TechnologyType;
  createdAt: string;
  updatedAt: string;
};

export type Technology = {
  id: number;
  name: string;
  type: TechnologyType;
};

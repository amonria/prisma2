import { Project } from "../project/Project";

export type Location = {
  createdAt: Date;
  id: string;
  projects?: Array<Project>;
  updatedAt: Date;
};

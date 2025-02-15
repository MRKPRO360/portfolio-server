import { Model } from 'mongoose';

export interface IProject {
  name: string;
  type: 'frontend' | 'fullstack';
  details: string;
  liveLink: string;
  githubLink: string;
  coverImage: string;
  projectImages: string[];
  technologies: string[];
  authorEmail: string;
  isDeleted?: boolean;
}

export interface ProjectModel extends Model<IProject> {
  isProjectExistsById: (id: string) => Promise<IProject | null>;
}

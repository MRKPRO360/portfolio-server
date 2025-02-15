import { model, Schema } from 'mongoose';
import { IProject, ProjectModel } from './project.interface';

const projectSchema = new Schema<IProject, ProjectModel>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['frontend', 'fullstack'],
      default: 'frontend',
    },
    details: { type: String, required: true },
    liveLink: { type: String, required: true },
    githubLink: { type: String, required: true },
    projectImages: { type: [String], required: true },
    coverImage: { type: String, required: true },
    technologies: { type: [String], required: true },
    authorEmail: {
      type: String,
      required: true,
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

projectSchema.statics.isProjectExistsById = async (id: string) => {
  return await Project.findById(id);
};

const Project = model<IProject, ProjectModel>('Project', projectSchema);

export default Project;

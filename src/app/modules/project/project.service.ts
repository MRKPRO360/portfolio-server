import AppError from '../../errors/AppError';
import { IProject } from './project.interface';
import Project from './project.model';

const createProjectInDB = async (payload: IProject) => {
  return await Project.create({
    ...payload,
    coverImage: payload.coverImage,
    projectImages: payload.projectImages,
  });
};

const getAllProjectsFromDB = async () => {
  return await Project.find({ isDeleted: { $ne: true } });
};

const getSingleProjectFromDB = async (id: string) => {
  return await Project.findById(id);
};

const updateProjectInDB = async (id: string, payload: Partial<IProject>) => {
  const project = await Project.isProjectExistsById(id);

  if (!project) throw new AppError(400, 'Project not found!');

  return await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteProjectFromDB = async (id: string) => {
  const project = await Project.isProjectExistsById(id);

  if (!project) throw new AppError(400, 'Project not found!');

  return await Project.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const projectServices = {
  createProjectInDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
};

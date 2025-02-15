import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { projectServices } from './project.service';

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getAllProjectsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Projects retrieved successfully!',
    data: result,
  });
});

const getAProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const result = await projectServices.getSingleProjectFromDB(projectId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project retrieved successfully!',
    data: result,
  });
});

const createAProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.createProjectInDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Project created successfully!',
    data: result,
  });
});

const updateAProject = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const { projectId } = req.params;
  const result = await projectServices.updateProjectInDB(
    projectId,
    updatedData,
  );

  // SEND RESPONSE IF THE project IS NOT FOUND ON DB
  if (!result) throw new Error("This project doesn't exist on database 💥");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project updated successfully!',
    data: result,
  });
});

const deleteAProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const result = await projectServices.deleteProjectFromDB(projectId);

  // SEND RESPONSE IF THE project IS NOT FOUND ON DB
  if (!result) throw new Error("This project doesn't exist on database 💥");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Project deleted successfully!',
    data: {},
  });
});

export const projectControllers = {
  getAllProjects,
  getAProject,
  updateAProject,
  deleteAProject,
  createAProject,
};

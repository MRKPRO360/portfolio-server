import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { blogServices } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs retrieved successfully!',
    data: result,
  });
});

const getMyBlogs = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await blogServices.getMyBlogFromDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs retrieved successfully!',
    data: result,
  });
});

const getABlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;

  const result = await blogServices.getSingleBlogFromDB(blogId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved successfully!',
    data: result,
  });
});

const createABlog = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await blogServices.createBlogInDB(req.file, req.body, user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully!',
    data: result,
  });
});

const updateABlog = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const { blogId } = req.params;
  const result = await blogServices.updateBlogInDB(blogId, updatedData);

  // SEND RESPONSE IF THE Blog IS NOT FOUND ON DB
  if (!result) throw new Error("This Blog doesn't exist on database 💥");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

const deleteABlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await blogServices.deleteBlogFromDB(blogId);

  // SEND RESPONSE IF THE Blog IS NOT FOUND ON DB
  if (!result) throw new Error("This Blog doesn't exist on database 💥");

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog deleted successfully!',
    data: {},
  });
});

export const blogControllers = {
  getAllBlogs,
  getABlog,
  getMyBlogs,
  updateABlog,
  deleteABlog,
  createABlog,
};

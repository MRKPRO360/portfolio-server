import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import Blog from './blog.model';
import { IBlog } from './blog.interface';
import User from '../user/user.model';

const createBlogInDB = async (
  file: any,
  payload: IBlog,
  userData: JwtPayload,
) => {
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) return new AppError(400, 'User does not exist');

  return await Blog.create({
    ...payload,
    blogImage: file.path,
    author: user._id,
  });
};

const getMyBlogFromDB = async (userData: JwtPayload) => {
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) return new AppError(400, 'User does not exist');

  // CHECK IF USER IS BLOCKED
  if (user.isBlocked) throw new AppError(403, 'User is blocked!');

  // CHECK IF USER IS DELETED
  if (user.isDeleted) throw new AppError(403, 'User is deleted!');

  return await Blog.find({ author: user._id });
};

const getAllBlogsFromDB = async () => {
  return await Blog.find({ isDeleted: { $ne: false } });
};

const getSingleBlogFromDB = async (id: string) => {
  return await Blog.findById(id);
};

const updateBlogInDB = async (id: string, payload: Partial<IBlog>) => {
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(400, 'Blog not found!');

  return await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(400, 'Blog not found!');

  return await Blog.findByIdAndUpdate(
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

export const blogServices = {
  createBlogInDB,
  getAllBlogsFromDB,
  getMyBlogFromDB,
  getSingleBlogFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};

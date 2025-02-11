import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import USER_ROLES from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { blogControllers } from './blog.controller';
import { blogValidationsSchema } from './blog.validation';

const router = express.Router();

router
  .route('/')
  .get(blogControllers.getAllBlogs)
  .post(
    auth(USER_ROLES.admin),
    multerUpload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(blogValidationsSchema.createBlogValidationSchema),
    blogControllers.createABlog,
  );

router
  .route('/my-blog')
  .get(auth(USER_ROLES.admin, USER_ROLES.user), blogControllers.getMyBlogs);

router
  .route('/:blogId')
  .get(blogControllers.getABlog)
  .patch(
    validateRequest(blogValidationsSchema.updateBlogValidationSchema),
    blogControllers.updateABlog,
  )
  .delete(blogControllers.deleteABlog);

export default router;

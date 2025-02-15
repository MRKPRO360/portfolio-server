/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';
// import USER_ROLES from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { projectControllers } from './project.controller';
import { projectValidationsSchema } from './project.validation';

const router = express.Router();

router
  .route('/')
  .get(projectControllers.getAllProjects)
  .post(
    // auth(USER_ROLES.admin),
    // multerUpload.array('files', 5),
    // (req: Request, res: Response, next: NextFunction) => {
    //   if (req.body.data) {
    //     req.body = JSON.parse(req.body.data);
    //   }

    //   // Extract uploaded image URLs from Cloudinary
    //   if (req.files) {
    //     const files = req.files as Express.Multer.File[];
    //     req.body.blogImages = files.map((file) => (file as any).path); // Cloudinary stores the URL in `path`
    //   }
    //   next();
    // },
    multerUpload.fields([
      { name: 'coverImage', maxCount: 1 },
      { name: 'projectImages', maxCount: 5 },
    ]),
    (req: Request, res: Response, next: NextFunction) => {
      // DATA
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      // COVER IMAGE
      if (req.files && (req.files as any).coverImage) {
        req.body.coverImage = (req.files as any).coverImage[0].path;
      }

      // PROJECT IMAGES
      if (req.files && (req.files as any).projectImages) {
        req.body.projectImages = (req.files as any).projectImages.map(
          (file: any) => file.path,
        );
      }

      next();
    },
    validateRequest(projectValidationsSchema.createProjectValidationSchema),
    projectControllers.createAProject,
  );

router
  .route('/:projectId')
  .get(projectControllers.getAProject)
  .patch(
    validateRequest(projectValidationsSchema.updateProjectValidationSchema),
    projectControllers.updateAProject,
  )
  .delete(projectControllers.deleteAProject);

export default router;

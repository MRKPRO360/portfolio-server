import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';
// import USER_ROLES from '../user/user.constant';
import { mailControllers } from './mail.controller';
import { mailValidationSchema } from './mail.validation';

const router = express.Router();

router
  .route('/')
  .get(
    // auth(USER_ROLES.user, USER_ROLES.admin),
    mailControllers.getAllMails,
  )
  .post(
    // auth(USER_ROLES.user, USER_ROLES.admin),
    validateRequest(mailValidationSchema.createMailValidation),
    mailControllers.createMail,
  );

export default router;

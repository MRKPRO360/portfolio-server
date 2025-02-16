"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
// import auth from '../../middlewares/auth';
// import USER_ROLES from '../user/user.constant';
const multer_config_1 = require("../../config/multer.config");
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = express_1.default.Router();
router
    .route('/')
    .get(project_controller_1.projectControllers.getAllProjects)
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
multer_config_1.multerUpload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'projectImages', maxCount: 5 },
]), (req, res, next) => {
    // DATA
    if (req.body.data) {
        req.body = JSON.parse(req.body.data);
    }
    // COVER IMAGE
    if (req.files && req.files.coverImage) {
        req.body.coverImage = req.files.coverImage[0].path;
    }
    // PROJECT IMAGES
    if (req.files && req.files.projectImages) {
        req.body.projectImages = req.files.projectImages.map((file) => file.path);
    }
    next();
}, (0, validateRequest_1.default)(project_validation_1.projectValidationsSchema.createProjectValidationSchema), project_controller_1.projectControllers.createAProject);
router
    .route('/:projectId')
    .get(project_controller_1.projectControllers.getAProject)
    .patch((0, validateRequest_1.default)(project_validation_1.projectValidationsSchema.updateProjectValidationSchema), project_controller_1.projectControllers.updateAProject)
    .delete(project_controller_1.projectControllers.deleteAProject);
exports.default = router;

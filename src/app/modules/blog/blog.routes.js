"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
// import auth from '../../middlewares/auth';
// import USER_ROLES from '../user/user.constant';
const multer_config_1 = require("../../config/multer.config");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router
    .route('/')
    .get(blog_controller_1.blogControllers.getAllBlogs)
    .post(
// auth(USER_ROLES.admin, USER_ROLES.user),
multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(blog_validation_1.blogValidationsSchema.createBlogValidationSchema), blog_controller_1.blogControllers.createABlog);
router.route('/my-blog').get(
// auth(USER_ROLES.admin, USER_ROLES.user),
blog_controller_1.blogControllers.getMyBlogs);
router
    .route('/:blogId')
    .get(blog_controller_1.blogControllers.getABlog)
    .patch(
// auth(USER_ROLES.admin, USER_ROLES.user),
(0, validateRequest_1.default)(blog_validation_1.blogValidationsSchema.updateBlogValidationSchema), blog_controller_1.blogControllers.updateABlog)
    .delete(blog_controller_1.blogControllers.deleteABlog);
exports.default = router;

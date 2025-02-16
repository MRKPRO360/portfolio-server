"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
// import auth from '../../middlewares/auth';
// import USER_ROLES from '../user/user.constant';
const mail_controller_1 = require("./mail.controller");
const mail_validation_1 = require("./mail.validation");
const router = express_1.default.Router();
router
    .route('/')
    .get(
// auth(USER_ROLES.user, USER_ROLES.admin),
mail_controller_1.mailControllers.getAllMails)
    .post(
// auth(USER_ROLES.user, USER_ROLES.admin),
(0, validateRequest_1.default)(mail_validation_1.mailValidationSchema.createMailValidation), mail_controller_1.mailControllers.createMail);
exports.default = router;

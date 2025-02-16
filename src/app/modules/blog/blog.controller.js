"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogServices.getAllBlogsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs retrieved successfully!',
        data: result,
    });
}));
const getMyBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield blog_service_1.blogServices.getMyBlogFromDB(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs retrieved successfully!',
        data: result,
    });
}));
const getABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.blogServices.getSingleBlogFromDB(blogId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog retrieved successfully!',
        data: result,
    });
}));
const createABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield blog_service_1.blogServices.createBlogInDB(req.file, req.body, user);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully!',
        data: result,
    });
}));
const updateABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const { blogId } = req.params;
    const result = yield blog_service_1.blogServices.updateBlogInDB(blogId, updatedData);
    // SEND RESPONSE IF THE Blog IS NOT FOUND ON DB
    if (!result)
        throw new Error("This Blog doesn't exist on database 💥");
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog updated successfully!',
        data: result,
    });
}));
const deleteABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.blogServices.deleteBlogFromDB(blogId);
    // SEND RESPONSE IF THE Blog IS NOT FOUND ON DB
    if (!result)
        throw new Error("This Blog doesn't exist on database 💥");
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blog deleted successfully!',
        data: {},
    });
}));
exports.blogControllers = {
    getAllBlogs,
    getABlog,
    getMyBlogs,
    updateABlog,
    deleteABlog,
    createABlog,
};

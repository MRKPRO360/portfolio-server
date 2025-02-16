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
exports.blogServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const createBlogInDB = (file, payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
    // if (!user) return new AppError(400, 'User does not exist');
    return yield blog_model_1.default.create(Object.assign(Object.assign({}, payload), { blogImage: file.path, author: (user === null || user === void 0 ? void 0 : user._id) || payload.author }));
});
const getMyBlogFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!user)
        return new AppError_1.default(400, 'User does not exist');
    // CHECK IF USER IS BLOCKED
    if (user.isBlocked)
        throw new AppError_1.default(403, 'User is blocked!');
    // CHECK IF USER IS DELETED
    if (user.isDeleted)
        throw new AppError_1.default(403, 'User is deleted!');
    return yield blog_model_1.default.find({ author: user._id });
});
const getAllBlogsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.find({ isDeleted: { $ne: true } });
});
const getSingleBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.findById(id);
});
const updateBlogInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.isBlogExistsById(id);
    if (!blog)
        throw new AppError_1.default(400, 'Blog not found!');
    return yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.isBlogExistsById(id);
    if (!blog)
        throw new AppError_1.default(400, 'Blog not found!');
    return yield blog_model_1.default.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
});
exports.blogServices = {
    createBlogInDB,
    getAllBlogsFromDB,
    getMyBlogFromDB,
    getSingleBlogFromDB,
    updateBlogInDB,
    deleteBlogFromDB,
};

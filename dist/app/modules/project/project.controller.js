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
exports.projectControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const project_service_1 = require("./project.service");
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.projectServices.getAllProjectsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved successfully!',
        data: result,
    });
}));
const getAProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const result = yield project_service_1.projectServices.getSingleProjectFromDB(projectId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project retrieved successfully!',
        data: result,
    });
}));
const createAProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.projectServices.createProjectInDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Project created successfully!',
        data: result,
    });
}));
const updateAProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const { projectId } = req.params;
    const result = yield project_service_1.projectServices.updateProjectInDB(projectId, updatedData);
    // SEND RESPONSE IF THE project IS NOT FOUND ON DB
    if (!result)
        throw new Error("This project doesn't exist on database 💥");
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project updated successfully!',
        data: result,
    });
}));
const deleteAProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const result = yield project_service_1.projectServices.deleteProjectFromDB(projectId);
    // SEND RESPONSE IF THE project IS NOT FOUND ON DB
    if (!result)
        throw new Error("This project doesn't exist on database 💥");
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Project deleted successfully!',
        data: {},
    });
}));
exports.projectControllers = {
    getAllProjects,
    getAProject,
    updateAProject,
    deleteAProject,
    createAProject,
};

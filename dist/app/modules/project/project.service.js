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
exports.projectServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const project_model_1 = __importDefault(require("./project.model"));
const createProjectInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.default.create(Object.assign(Object.assign({}, payload), { coverImage: payload.coverImage, projectImages: payload.projectImages }));
});
const getAllProjectsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.default.find({ isDeleted: { $ne: true } });
});
const getSingleProjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.default.findById(id);
});
const updateProjectInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.isProjectExistsById(id);
    if (!project)
        throw new AppError_1.default(400, 'Project not found!');
    return yield project_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
});
const deleteProjectFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.isProjectExistsById(id);
    if (!project)
        throw new AppError_1.default(400, 'Project not found!');
    return yield project_model_1.default.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
});
exports.projectServices = {
    createProjectInDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    updateProjectInDB,
    deleteProjectFromDB,
};

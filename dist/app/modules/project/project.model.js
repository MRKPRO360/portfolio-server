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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ['frontend', 'fullstack'],
        default: 'frontend',
    },
    details: { type: String, required: true },
    liveLink: { type: String, required: true },
    githubLink: { type: String, required: true },
    projectImages: { type: [String], required: true },
    coverImage: { type: String, required: true },
    technologies: { type: [String], required: true },
    authorEmail: {
        type: String,
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
projectSchema.statics.isProjectExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Project.findById(id);
});
const Project = (0, mongoose_1.model)('Project', projectSchema);
exports.default = Project;

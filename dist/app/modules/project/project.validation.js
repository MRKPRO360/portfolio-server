"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidationsSchema = void 0;
const zod_1 = require("zod");
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        type: zod_1.z.enum(['frontend', 'fullstack']),
        details: zod_1.z.string().min(1, 'Details are required'),
        liveLink: zod_1.z.string().url('Invalid URL format'),
        githubLink: zod_1.z.string().url('Invalid URL format'),
        authorEmail: zod_1.z.string({ required_error: 'Author email is required' }),
        technologies: zod_1.z
            .array(zod_1.z.string())
            .nonempty('At least one technology is required'),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        details: zod_1.z.string().min(1, 'Details are required').optional(),
        liveLink: zod_1.z.string().url('Invalid URL format').optional(),
        githubLink: zod_1.z.string().url('Invalid URL format').optional(),
        technologies: zod_1.z
            .array(zod_1.z.string())
            .nonempty('At least one technology is required')
            .optional(),
    }),
});
exports.projectValidationsSchema = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};

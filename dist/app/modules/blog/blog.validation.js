"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationsSchema = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required!',
        })
            .min(10, 'Title should be at least 10 characters'),
        content: zod_1.z
            .string({
            required_error: 'Content is required!',
        })
            .min(10, 'Content should be at least 10 characters'),
        tag: zod_1.z.string({
            required_error: 'Tag is required!',
        }),
        author: zod_1.z.string({ required_error: 'Author name is required' }),
        authorEmail: zod_1.z.string({ required_error: 'Author email required' }),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        tag: zod_1.z.string().optional(),
    }),
});
exports.blogValidationsSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};

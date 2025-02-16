"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailValidationSchema = void 0;
const zod_1 = require("zod");
const createMailValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Invalid email address'),
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .min(1, 'Name is required'),
        message: zod_1.z
            .string({
            required_error: 'Message is required',
        })
            .min(1, 'Message is required'),
    }),
});
exports.mailValidationSchema = {
    createMailValidation,
};

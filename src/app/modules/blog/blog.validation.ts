import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required!',
      })
      .min(10, 'Title should be at least 10 characters'),
    content: z
      .string({
        required_error: 'Content is required!',
      })
      .min(10, 'Content should be at least 10 characters'),
    tag: z.string({
      required_error: 'Tag is required!',
    }),
    blogImage: z.string({ required_error: 'Blog image is required!' }),
    author: z.string({ required_error: 'Author is required' }),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tag: z.string().optional(),
    blogImage: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const blogValidationsSchema = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

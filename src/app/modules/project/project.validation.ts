import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.enum(['frontend', 'fullstack']),
    details: z.string().min(1, 'Details are required'),
    liveLink: z.string().url('Invalid URL format'),
    githubLink: z.string().url('Invalid URL format'),
    authorEmail: z.string({ required_error: 'Author email is required' }),
    technologies: z
      .array(z.string())
      .nonempty('At least one technology is required'),
  }),
});
const updateProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    details: z.string().min(1, 'Details are required').optional(),
    liveLink: z.string().url('Invalid URL format').optional(),
    githubLink: z.string().url('Invalid URL format').optional(),
    technologies: z
      .array(z.string())
      .nonempty('At least one technology is required')
      .optional(),
  }),
});

export const projectValidationsSchema = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};

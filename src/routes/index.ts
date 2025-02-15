import { Router } from 'express';

import authRoutes from '../app/modules/auth/auth.route';
import userRoutes from '../app/modules/user/user.routes';
import blogRoutes from '../app/modules/blog/blog.routes';
import projectRoutes from '../app/modules/project/project.routes';
import mailsRoutes from '../app/modules/mail/mail.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },
  {
    path: '/mails',
    route: mailsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

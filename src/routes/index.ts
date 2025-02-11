import { Router } from 'express';

import authRoutes from '../app/modules/auth/auth.route';
import userRoutes from '../app/modules/user/user.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

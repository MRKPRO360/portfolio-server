"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../app/modules/auth/auth.route"));
const user_routes_1 = __importDefault(require("../app/modules/user/user.routes"));
const blog_routes_1 = __importDefault(require("../app/modules/blog/blog.routes"));
const project_routes_1 = __importDefault(require("../app/modules/project/project.routes"));
const mail_routes_1 = __importDefault(require("../app/modules/mail/mail.routes"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/users',
        route: user_routes_1.default,
    },
    {
        path: '/blogs',
        route: blog_routes_1.default,
    },
    {
        path: '/projects',
        route: project_routes_1.default,
    },
    {
        path: '/mails',
        route: mail_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

import express from "express";
import { UserRoutes } from "../modules/User/user.routes.js";
import { adminRoutes } from "../modules/Admin/admin.routes.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

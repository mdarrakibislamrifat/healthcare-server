import express, { type Request, type Response } from "express";
import { AdminController } from "./admin.controller.js";

const app = express();

const router = express.Router();

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch("/:id", AdminController.updateFromDB);

router.delete("/:id", AdminController.deleteFromDB);

export const adminRoutes = router;

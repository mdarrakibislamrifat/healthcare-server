import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { AdminController } from "./admin.controller.js";

import validateRequest from "../../middlewares/validateRequest.js";
import { adminValidation } from "./admin.validations.js";

const app = express();

const router = express.Router();

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch(
  "/:id",
  validateRequest(adminValidation.update),
  AdminController.updateFromDB
);

router.delete("/:id", AdminController.deleteFromDB);

router.delete("/soft/:id", AdminController.softDeleteFromDB);

export const adminRoutes = router;

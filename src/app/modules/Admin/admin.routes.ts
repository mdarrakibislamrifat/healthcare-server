import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { AdminController } from "./admin.controller.js";

import { z, ZodObject } from "zod";

const app = express();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

const router = express.Router();

router.get("/", AdminController.getAllFromDB);

router.get("/:id", AdminController.getByIdFromDB);

router.patch("/:id", validateRequest(update), AdminController.updateFromDB);

router.delete("/:id", AdminController.deleteFromDB);

router.delete("/soft/:id", AdminController.softDeleteFromDB);

export const adminRoutes = router;

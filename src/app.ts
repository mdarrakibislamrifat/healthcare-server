import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes.js";
import { adminRoutes } from "./app/modules/Admin/admin.routes.js";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Healthcare Server is running",
  });
});

app.use("/api/v1/user", UserRoutes);

app.use("/api/v1/admin", adminRoutes);

export default app;

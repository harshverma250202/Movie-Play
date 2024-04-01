import { Router } from "express";
import {
  Get_All_Movies,
  Get_Movie_ById,
  Create_Movie,
  Update_Movie,
  Delete_Movie,
} from "../controllers/movies.controller.js"
import { checkForAdminAuthentication } from "../middleware/auth.middleware.js";
const router = Router();
router.route("/").get(Get_All_Movies);
router.route("/:id").get(Get_Movie_ById);
router.route("/").post(checkForAdminAuthentication,Create_Movie);
router.route("/:id").patch(checkForAdminAuthentication,Update_Movie);
router.route("/:id").delete(checkForAdminAuthentication,Delete_Movie);

export default router;
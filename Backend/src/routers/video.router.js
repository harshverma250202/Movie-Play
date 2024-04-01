import { Router } from "express";
import { downloadVideo, getConstantResStream, getRandomVideoPlaylist, getVideoIndexPlaylist, getVideoSegment, getVideoStream } from "../controllers/video.controller.js";
import { checkForUserAuthentication } from "../middleware/auth.middleware.js";
import { userSubscriptionData } from "../middleware/user.middleware.js";

const router = Router();

router.use(checkForUserAuthentication);
router.use(userSubscriptionData);

router.route("/play").get(getRandomVideoPlaylist);
router.route("/play/:video").get(getVideoIndexPlaylist);

router.route("/stream/:video/:stream").get(getVideoStream);
router.route("/segment/:video/:stream/:segment").get(getVideoSegment);
router.route("/res/:video/:resolution").get(getConstantResStream);

router.route("/download/:video").get(downloadVideo);

export default router;

import Express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getposts } from "../controllers/post.controller.js";

const router = Express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getposts);

export default router;

import Express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";

const router = Express.Router();

router.post("/create", verifyToken, create);

export default router;

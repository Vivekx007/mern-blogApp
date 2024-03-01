import Express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";

const router = Express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
// router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default router;

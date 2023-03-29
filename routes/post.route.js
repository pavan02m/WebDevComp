import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post.controller.js";
import { verifyToken} from "../utils/validations.js";
const router  = express.Router();

router.post("/createpost",verifyToken,createPost);
router.get("/:userId",verifyToken,getAllPosts);
router.get("/:userId/:postId",verifyToken,getPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);

export default router;


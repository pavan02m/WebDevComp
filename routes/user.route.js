import express from "express";
import { delteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken, verifyUser } from "../utils/validations.js";
const router  = express.Router();

router.get("/:id",verifyToken,getUser);
router.put("/:id",updateUser);
router.delete("/:id",delteUser);

export default router;


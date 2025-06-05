import express from "express";
import { deleteUser, getUser,getUsers } from "../controllers/user.controller.js";
import { verifyToken,verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/", verifyToken,verifyAdmin, getUsers);

export default router;

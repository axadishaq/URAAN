import express from "express";
import {
   deleteUser,
   getUser,
   getUsers,
} from "../controllers/user.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getUsers);
router.get("/:id", getUser);
// own account or admin (checked in the controller)
router.delete("/:id", verifyToken, deleteUser);

export default router;

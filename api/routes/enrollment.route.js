import express from "express";
import {
   enrollCourse,
   getUserEnrollments,
} from "../controllers/enrollment.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, enrollCourse);
router.get("/user/:userId", verifyToken, getUserEnrollments);

export default router;

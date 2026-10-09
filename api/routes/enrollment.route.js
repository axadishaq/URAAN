import express from "express";
import {
   enrollCourse,
   getUserEnrollments,
   getEnrollmentStatus,
} from "../controllers/enrollment.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, enrollCourse);
router.get("/me", verifyToken, getUserEnrollments);
router.get("/status/:courseId", verifyToken, getEnrollmentStatus);
router.get("/user/:userId", verifyToken, getUserEnrollments);

export default router;

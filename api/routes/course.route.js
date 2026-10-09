import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
   createCourse,
   deleteCourse,
   getCourse,
   getCourses,
   updateCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", verifyToken, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", verifyToken, updateCourse);
router.delete("/:id", verifyToken, deleteCourse);

export default router;

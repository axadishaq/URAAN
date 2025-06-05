import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
   createCourse,
   deleteCourse,
   getCourse,
   getCourses,
   updateCourse,
   getCoursesByCountry,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.delete("/:id", verifyToken, deleteCourse);

router.get("/:id", getCourse);
// router.get("/country/:country", getCoursesByCountry);

// router.put("/:id", verifyToken, updateCourse);

export default router;

// const router = express.Router();

// // Create a course
// router.post("/", async (req, res, next) => {
//    try {
//       const newCourse = new Course(req.body);
//       const savedCourse = await newCourse.save();
//       res.status(201).json(savedCourse);
//    } catch (err) {
//       next(err);
//    }
// });

// // Get all courses
// router.get("/", async (req, res, next) => {
//    try {
//       const courses = await Course.find();
//       res.status(200).json(courses);
//    } catch (err) {
//       next(err);
//    }
// });

// // Get a single course
// router.get("/:id", async (req, res, next) => {
//    try {
//       const course = await Course.findById(req.params.id);
//       res.status(200).json(course);
//    } catch (err) {
//       next(err);
//    }
// });

// // Update a course
// router.put("/:id", async (req, res, next) => {
//    try {
//       const updatedCourse = await Course.findByIdAndUpdate(
//          req.params.id,
//          { $set: req.body },
//          { new: true }
//       );
//       res.status(200).json(updatedCourse);
//    } catch (err) {
//       next(err);
//    }
// });

// // Delete a course
// router.delete("/:id", async (req, res, next) => {
//    try {
//       await Course.findByIdAndDelete(req.params.id);
//       res.status(200).json("Course deleted");
//    } catch (err) {
//       next(err);
//    }
// });

// export default router;

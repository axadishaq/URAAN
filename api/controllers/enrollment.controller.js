import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";
// Enroll in a course
export const enrollCourse = async (req, res, next) => {
   try {
      const userId = req.body.userId || req.user._id;
      const courseId = req.body.courseId || req.params.courseId;

      // Prevent duplicate enrollment
      const exists = await Enrollment.findOne({
         userId,
         courseId,
      });
      if (exists) return res.status(400).send({ message: "Already enrolled" });

      const enrollment = new Enrollment({ userId, courseId });
      const saved = await enrollment.save();
      res.status(201).send(saved);
   } catch (err) {
      next(err);
   }
};

// Get all enrollments for a user
export const getUserEnrollments = async (req, res, next) => {
   try {
      const enrollments = await Enrollment.find({
         userId: req.params.userId,
      }).populate("courseId");
      res.status(200).send(enrollments);
   } catch (err) {
      next(err);
   }
};

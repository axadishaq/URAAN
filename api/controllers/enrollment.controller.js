import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";
import createError from "../utils/createError.js";
import { isValidId } from "../utils/helpers.js";

// Enroll the logged-in user in a course
export const enrollCourse = async (req, res, next) => {
   try {
      // The user always comes from the login token, never from the request
      const userId = req.userId;
      const courseId = req.body.courseId || req.params.courseId;

      if (!isValidId(courseId))
         return next(createError(404, "Course not found!"));
      const course = await Course.findById(courseId);
      if (!course) return next(createError(404, "Course not found!"));
      if (course.userId === userId)
         return next(createError(400, "You can't enroll in your own course!"));

      // Prevent duplicate enrollment
      const exists = await Enrollment.findOne({ userId, courseId });
      if (exists) return next(createError(400, "Already enrolled"));

      const saved = await new Enrollment({ userId, courseId }).save();
      await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
      res.status(201).send(saved);
   } catch (err) {
      // unique index race: two clicks at the same time
      if (err.code === 11000) return next(createError(400, "Already enrolled"));
      next(err);
   }
};

// Get all enrollments for a user, with the course details attached
export const getUserEnrollments = async (req, res, next) => {
   try {
      const userId = req.params.userId || req.userId;
      if (userId !== req.userId && !req.isAdmin)
         return next(createError(403, "You can see only your enrollments!"));

      const enrollments = await Enrollment.find({ userId }).sort({
         createdAt: -1,
      });
      const courseIds = enrollments
         .map((e) => e.courseId)
         .filter((id) => isValidId(id));
      const courses = await Course.find({ _id: { $in: courseIds } });
      const courseById = new Map(courses.map((c) => [c._id.toString(), c]));

      // Skip enrollments whose course was deleted
      const result = enrollments
         .filter((e) => courseById.has(e.courseId))
         .map((e) => ({ ...e.toObject(), course: courseById.get(e.courseId) }));
      res.status(200).send(result);
   } catch (err) {
      next(err);
   }
};

// Is the logged-in user enrolled in this course?
export const getEnrollmentStatus = async (req, res, next) => {
   try {
      const exists = await Enrollment.exists({
         userId: req.userId,
         courseId: req.params.courseId,
      });
      res.status(200).send({ enrolled: Boolean(exists) });
   } catch (err) {
      next(err);
   }
};

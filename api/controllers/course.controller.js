import Course from "../models/course.model.js";
import Enrollment from "../models/enrollment.model.js";
import createError from "../utils/createError.js";
import { escapeRegex, isValidId } from "../utils/helpers.js";

// Fields a course owner is allowed to set
const pickCourseFields = (body) => {
   const allowed = [
      "gigId",
      "title",
      "description",
      "price",
      "category",
      "coverImage",
      "level",
   ];
   return Object.fromEntries(
      allowed.filter((key) => body[key] !== undefined).map((k) => [k, body[k]])
   );
};

// Create a new course (service providers only)
export const createCourse = async (req, res, next) => {
   try {
      if (!req.isSeller)
         return next(
            createError(403, "Only service providers can create courses!")
         );
      const newCourse = new Course({
         ...pickCourseFields(req.body),
         userId: req.userId,
      });
      const savedCourse = await newCourse.save();
      res.status(201).send(savedCourse);
   } catch (err) {
      next(err);
   }
};

// Get all courses (optional filters: userId, level, category, search)
export const getCourses = async (req, res, next) => {
   try {
      const q = req.query;
      const filter = {
         ...(q.userId && { userId: q.userId }),
         ...(q.level && { level: q.level }),
         ...(q.category && {
            category: { $regex: `^${escapeRegex(q.category)}$`, $options: "i" },
         }),
         ...(q.search?.trim() && {
            title: { $regex: escapeRegex(q.search.trim()), $options: "i" },
         }),
      };
      const courses = await Course.find(filter).sort({ createdAt: -1 });
      res.status(200).send(courses);
   } catch (err) {
      next(err);
   }
};

// Get a single course by ID
export const getCourse = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "Course not found!"));
      const course = await Course.findById(req.params.id);
      if (!course) return next(createError(404, "Course not found!"));
      res.status(200).send(course);
   } catch (err) {
      next(err);
   }
};

const findOwnCourse = async (req) => {
   if (!isValidId(req.params.id)) throw createError(404, "Course not found!");
   const course = await Course.findById(req.params.id);
   if (!course) throw createError(404, "Course not found!");
   if (course.userId !== req.userId && !req.isAdmin)
      throw createError(403, "You can change only your own course!");
   return course;
};

// Update a course (owner only)
export const updateCourse = async (req, res, next) => {
   try {
      await findOwnCourse(req);
      const updatedCourse = await Course.findByIdAndUpdate(
         req.params.id,
         { $set: pickCourseFields(req.body) },
         { new: true, runValidators: true }
      );
      res.status(200).send(updatedCourse);
   } catch (err) {
      next(err);
   }
};

// Delete a course (owner or admin)
export const deleteCourse = async (req, res, next) => {
   try {
      await findOwnCourse(req);
      await Course.findByIdAndDelete(req.params.id);
      await Enrollment.deleteMany({ courseId: req.params.id });
      res.status(200).send({ message: "Course deleted" });
   } catch (err) {
      next(err);
   }
};

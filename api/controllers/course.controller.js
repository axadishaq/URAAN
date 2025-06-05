import Course from "../models/course.model.js";

// Create a new course
export const createCourse = async (req, res, next) => {
   try {
      const newCourse = new Course(req.body);
      const savedCourse = await newCourse.save();
      res.status(201).send(savedCourse);
   } catch (err) {
      next(err);
   }
};

// Get all courses
export const getCourses = async (req, res, next) => {
   try {
      const filter = {};
      if (req.query.userId) {
         filter.userId = req.query.userId;
      }
      const courses = await Course.find(filter);
      res.status(200).send(courses);
   } catch (err) {
      next(err);
   }
};
// Get a single course by ID
export const getCourse = async (req, res, next) => {
   try {
      const course = await Course.findById(req.params.id);
      res.status(200).send(course);
   } catch (err) {
      next(err);
   }
};

// Update a course
export const updateCourse = async (req, res, next) => {
   try {
      const updatedCourse = await Course.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true }
      );
      res.status(200).send(updatedCourse);
   } catch (err) {
      next(err);
   }
};

// Delete a course
export const deleteCourse = async (req, res, next) => {
   try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).send("Course deleted");
   } catch (err) {
      next(err);
   }
};

export const getCoursesByCountry = async (req, res, next) => {
   try {
      const courses = await Course.find({ country: req.params.country });
      res.status(200).send(courses);
   } catch (err) {
      next(err);
   }
};

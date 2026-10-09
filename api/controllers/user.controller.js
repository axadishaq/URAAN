import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Course from "../models/course.model.js";
import Enrollment from "../models/enrollment.model.js";
import Review from "../models/review.model.js";
import createError from "../utils/createError.js";
import { isValidId } from "../utils/helpers.js";

// Never send these to the client
const PRIVATE_FIELDS = "-password";
// Extra fields hidden from the public profile
const PUBLIC_HIDDEN = "-password -email -phone -isAdmin";

export const deleteUser = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "User not found!"));
      const user = await User.findById(req.params.id);
      if (!user) return next(createError(404, "User not found!"));

      if (req.userId !== user._id.toString() && !req.isAdmin) {
         return next(createError(403, "You can delete only your account!"));
      }
      const id = user._id.toString();
      await User.findByIdAndDelete(id);
      // Remove what belonged to this user so no orphan listings remain
      await Promise.all([
         Gig.deleteMany({ userId: id }),
         Course.deleteMany({ userId: id }),
         Enrollment.deleteMany({ userId: id }),
         Review.deleteMany({ userId: id }),
      ]);
      res.status(200).send({ message: "Deleted." });
   } catch (err) {
      next(err);
   }
};

// get user (public profile)
export const getUser = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "User not found!"));
      const user = await User.findById(req.params.id).select(PUBLIC_HIDDEN);
      if (!user) return next(createError(404, "User not found!"));
      res.status(200).send(user);
   } catch (err) {
      next(err);
   }
};

export const getUsers = async (req, res, next) => {
   try {
      const users = await User.find()
         .select(PRIVATE_FIELDS)
         .sort({ createdAt: -1 });
      res.status(200).send(users);
   } catch (err) {
      next(err);
   }
};

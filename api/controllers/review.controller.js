import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import createError from "../utils/createError.js";
import { isValidId } from "../utils/helpers.js";

export const createReview = async (req, res, next) => {
   try {
      const { gigId } = req.body;
      const desc = req.body.desc?.trim();
      const star = Number(req.body.star);

      if (!isValidId(gigId)) return next(createError(404, "Service not found!"));
      if (!desc) return next(createError(400, "Please write a review!"));
      if (!Number.isInteger(star) || star < 1 || star > 5)
         return next(createError(400, "Rating must be between 1 and 5!"));

      const gig = await Gig.findById(gigId);
      if (!gig) return next(createError(404, "Service not found!"));
      if (gig.userId === req.userId)
         return next(createError(403, "You can't review your own service!"));

      // Reviews are only allowed after hiring the service
      const hasOrdered = await Order.exists({ gigId, buyerId: req.userId });
      if (!hasOrdered)
         return next(
            createError(403, "You can review a service only after ordering it!")
         );

      const review = await Review.findOne({ userId: req.userId, gigId });
      if (review)
         return next(
            createError(403, "You have already created a review on this Gig!")
         );

      const savedReview = await new Review({
         userId: req.userId,
         gigId,
         desc,
         star,
      }).save();
      //  updating star on gig
      await Gig.findByIdAndUpdate(gigId, {
         $inc: { totalStars: star, starNumber: 1 },
      });
      res.status(201).send(savedReview);
   } catch (err) {
      next(err);
   }
};

export const getReview = async (req, res, next) => {
   try {
      const reviews = await Review.find({ gigId: req.params.gigId }).sort({
         createdAt: -1,
      });
      res.status(200).send(reviews);
   } catch (err) {
      next(err);
   }
};

export const deleteReview = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "Review not found!"));
      const review = await Review.findById(req.params.id);
      if (!review) return next(createError(404, "Review not found!"));
      if (review.userId !== req.userId && !req.isAdmin)
         return next(createError(403, "You can delete only your review!"));

      await Review.findByIdAndDelete(req.params.id);
      await Gig.findByIdAndUpdate(review.gigId, {
         $inc: { totalStars: -review.star, starNumber: -1 },
      });
      res.status(200).send({ message: "Review deleted!" });
   } catch (err) {
      next(err);
   }
};

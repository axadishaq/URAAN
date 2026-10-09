import Gig from "../models/gig.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

import createError from "../utils/createError.js";
import { escapeRegex, isValidId } from "../utils/helpers.js";

export const createGig = async (req, res, next) => {
   if (!req.isSeller)
      return next(createError(403, "Only seller can create a gig!"));

   // Never trust these from the client
   const {
      userId: _userId,
      sales: _sales,
      totalStars: _totalStars,
      starNumber: _starNumber,
      ...body
   } = req.body;

   const newGig = new Gig({
      ...body,
      userId: req.userId,
   });

   try {
      const savedGig = await newGig.save();
      res.status(201).json(savedGig);
   } catch (err) {
      next(err);
   }
};

export const deleteGig = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "Gig not found!"));
      const gig = await Gig.findById(req.params.id);
      if (!gig) return next(createError(404, "Gig not found!"));

      if (gig.userId !== req.userId && !req.isAdmin)
         return next(createError(403, "You can delete only your gig!"));

      await Gig.findByIdAndDelete(req.params.id);
      await Review.deleteMany({ gigId: req.params.id });
      res.status(200).send({ message: "Gig has been deleted!" });
   } catch (err) {
      next(err);
   }
};

export const getGig = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "Gig not found!"));
      const gig = await Gig.findById(req.params.id);
      if (!gig) return next(createError(404, "Gig not found!"));
      res.status(200).send(gig);
   } catch (err) {
      next(err);
   }
};

const SORT_OPTIONS = {
   sales: { sales: -1 },
   createdAt: { createdAt: -1 },
   price: { price: 1 }, // cheapest first
   priceDesc: { price: -1 },
   rating: { starNumber: -1, totalStars: -1 },
};

export const getGigs = async (req, res, next) => {
   const q = req.query;
   const min = Number(q.min);
   const max = Number(q.max);
   const hasMin = q.min !== undefined && q.min !== "" && !isNaN(min);
   const hasMax = q.max !== undefined && q.max !== "" && !isNaN(max);
   // "cat" is accepted as an alias for older links
   const category = q.category || q.cat;

   const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(category && {
         category: { $regex: `^${escapeRegex(category)}$`, $options: "i" },
      }),
      ...(Number(q.maxDays) > 0 && {
         deliveryTime: { $lte: Number(q.maxDays) },
      }),
      ...((hasMin || hasMax) && {
         price: { ...(hasMin && { $gte: min }), ...(hasMax && { $lte: max }) },
      }),
   };
   const and = [];
   if (q.search?.trim())
      and.push({
         $or: ["title", "shortTitle", "desc", "category"].map((field) => ({
            [field]: { $regex: escapeRegex(q.search.trim()), $options: "i" },
         })),
      });
   try {
      if (q.country?.trim()) {
         // the gig's own city, or (for older gigs without one) the provider's city
         const cityRegex = { $regex: escapeRegex(q.country.trim()), $options: "i" };
         const users = await User.find({ country: cityRegex }, { _id: 1 });
         and.push({
            $or: [
               { country: cityRegex },
               {
                  userId: { $in: users.map((u) => u._id.toString()) },
                  $or: [{ country: { $exists: false } }, { country: "" }],
               },
            ],
         });
      }
      if (and.length) filters.$and = and;
      const gigs = await Gig.find(filters).sort(
         SORT_OPTIONS[q.sort] || SORT_OPTIONS.createdAt
      );
      res.status(200).send(gigs);
   } catch (err) {
      next(err);
   }
};

// Services in a city: the city typed on the gig itself, or (for older gigs
// without one) the city of the provider's profile.
export const getGigsByCountry = async (req, res, next) => {
   try {
      const cityRegex = {
         $regex: `^\\s*${escapeRegex(req.params.country.trim())}\\s*$`,
         $options: "i",
      };
      const users = await User.find({ country: cityRegex }, { _id: 1 });
      const userIds = users.map((u) => u._id.toString());
      const gigs = await Gig.find({
         $or: [
            { country: cityRegex },
            {
               userId: { $in: userIds },
               $or: [{ country: { $exists: false } }, { country: "" }],
            },
         ],
      }).sort({ createdAt: -1 });
      res.status(200).send(gigs);
   } catch (err) {
      next(err);
   }
};

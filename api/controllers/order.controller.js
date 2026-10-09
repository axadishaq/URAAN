import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import { isValidId } from "../utils/helpers.js";

export const createOrder = async (req, res, next) => {
   try {
      if (!isValidId(req.params.gigId))
         return next(createError(404, "Service not found!"));
      const gig = await Gig.findById(req.params.gigId);
      if (!gig) return next(createError(404, "Service not found!"));
      if (gig.userId === req.userId)
         return next(createError(400, "You can't order your own service!"));

      const newOrder = new Order({
         gigId: gig._id,
         img: gig.cover,
         title: gig.title,
         buyerId: req.userId,
         sellerId: gig.userId,
         deliveryTime: gig.deliveryTime,
         price: gig.price ?? 0,
         // No payment gateway yet (see report: future work)
         payment_intent: "pending",
      });

      const saved = await newOrder.save();
      await Gig.findByIdAndUpdate(gig._id, { $inc: { sales: 1 } });
      res.status(201).send(saved);
   } catch (err) {
      next(err);
   }
};

// Orders where the current user is the buyer or the seller
export const getOrders = async (req, res, next) => {
   try {
      const orders = await Order.find({
         $or: [{ sellerId: req.userId }, { buyerId: req.userId }],
      }).sort({ createdAt: -1 });

      res.status(200).send(orders);
   } catch (err) {
      next(err);
   }
};

// Seller marks the order as delivered/completed
export const completeOrder = async (req, res, next) => {
   try {
      if (!isValidId(req.params.id))
         return next(createError(404, "Order not found!"));
      const order = await Order.findById(req.params.id);
      if (!order) return next(createError(404, "Order not found!"));
      if (order.sellerId !== req.userId && !req.isAdmin)
         return next(
            createError(403, "Only the seller can complete this order!")
         );

      order.isCompleted = true;
      res.status(200).send(await order.save());
   } catch (err) {
      next(err);
   }
};

export const getAllOrders = async (req, res, next) => {
   try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).send(orders);
   } catch (err) {
      next(err);
   }
};

export const getOrdersByDate = async (req, res, next) => {
   try {
      // Group orders by date (YYYY-MM-DD) and count
      const stats = await Order.aggregate([
         {
            $group: {
               _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
               },
               count: { $sum: 1 },
            },
         },
         { $sort: { _id: 1 } },
      ]);
      // Format for recharts: [{ date: "2024-06-01", count: 5 }, ...]
      const formatted = stats.map((item) => ({
         date: item._id,
         count: item.count,
      }));
      res.status(200).send(formatted);
   } catch (err) {
      next(err);
   }
};

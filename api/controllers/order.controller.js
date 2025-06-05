import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";

export const createOrder = async (req, res, next) => {
   try {
      const gig = await Gig.findById(req.params.gigId);

      const newOrder = new Order({
         gigId: gig._id,
         img: gig.cover,
         title: gig.title,
         buyerId: req.userId,
         sellerId: gig.userId,
         deliveryTime: gig.deliveryTime,
         price: gig.price,
         payment_intent: "temperary",
      });

      await newOrder.save();
      res.status(200).send("successful");
   } catch (err) {
      next(err);
   }
};
export const getOrders = async (req, res, next) => {
   try {
      const orders = await Order.find({
         ...(req.sellerId ? { sellerId: req.userId } : { buyerId: req.userId }),
      });

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

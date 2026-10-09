import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";
import {
   getOrders,
   createOrder,
   completeOrder,
   getAllOrders,
   getOrdersByDate,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.get("/admin", verifyToken, verifyAdmin, getOrdersByDate);
router.get("/admin/all", verifyToken, verifyAdmin, getAllOrders);
router.put("/:id/complete", verifyToken, completeOrder);
router.post("/:gigId", verifyToken, createOrder);

export default router;

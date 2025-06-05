import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";
import { getOrders, createOrder } from "../controllers/order.controller.js";
import { getOrdersByDate } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

router.get("/admin", verifyToken, verifyAdmin, getOrdersByDate);

export default router;

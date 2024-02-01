import express from "express";
import { admin, protect } from "../middleware/authMiddleware";
import {
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  createOrder
} from "../controllers/orderController";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, admin, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;

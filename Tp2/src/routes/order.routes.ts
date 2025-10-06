import { Router } from "express";
import { OrderController } from "../controllers/orders.controller";

const router = Router();

router.post("/orders", OrderController.createOrder);
router.get("/orders/:id", OrderController.getOrderById);
router.get("/orders/status/:status", OrderController.getOrdersByStatus);
router.post("/orders/:id/cancel", OrderController.cancelOrder);

export default router;
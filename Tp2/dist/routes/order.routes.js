"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const router = (0, express_1.Router)();
router.post("/orders", orders_controller_1.OrderController.createOrder);
router.get("/orders/:id", orders_controller_1.OrderController.getOrderById);
router.get("/orders/status/:status", orders_controller_1.OrderController.getOrdersByStatus);
router.post("/orders/:id/cancel", orders_controller_1.OrderController.cancelOrder);
exports.default = router;
//# sourceMappingURL=order.routes.js.map
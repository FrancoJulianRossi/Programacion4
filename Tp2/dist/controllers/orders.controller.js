"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
class OrderController {
    static async createOrder(req, res) {
        try {
            const orderData = req.body;
            const newOrder = await order_service_1.orderService.createOrder(orderData);
            return res.status(201).json(newOrder);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async getOrderById(req, res) {
        try {
            const id = Number(req.params.id);
            const order = await order_service_1.orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.status(200).json(order);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async getOrdersByStatus(req, res) {
        try {
            const status = String(req.params.status);
            const orders = await order_service_1.orderService.getOrderByStatus(status);
            return res.status(200).json(orders);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async cancelOrder(req, res) {
        try {
            const id = Number(req.params.id);
            const cancelledOrder = await order_service_1.orderService.cancelOrder(id);
            if (!cancelledOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.status(200).json(cancelledOrder);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orders.controller.js.map
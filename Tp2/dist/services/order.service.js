"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mockOrder_1 = require("../models/order/mockOrder");
const mockOrder = new mockOrder_1.MockOrder();
exports.orderService = {
    createOrder(order) {
        return mockOrder.createOrder(order);
    },
    getOrderById(id) {
        return mockOrder.getOrderById(id);
    },
    getOrderByStatus(status) {
        return mockOrder.getOrderByStatus(status);
    },
    cancelOrder(id) {
        return mockOrder.cancelOrder(id);
    }
};
//# sourceMappingURL=order.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mockOrder_1 = require("../models/order/mockOrder");
const mockOrder = new mockOrder_1.MockOrder();
exports.orderService = {
    createOrder(order) {
        return Promise.resolve(mockOrder.createOrder(order));
    },
    getOrderById(id) {
        return Promise.resolve(mockOrder.getOrderById(id));
    },
    getOrderByStatus(status) {
        return Promise.resolve(mockOrder.getOrderByStatus(status));
    },
    cancelOrder(id) {
        return Promise.resolve(mockOrder.cancelOrder(id));
    }
};
//# sourceMappingURL=order.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const order_1 = require("../../models/order/order");
const mockOrder_1 = require("../../models/order/mockOrder");
(0, vitest_1.describe)('test OrderCRUD', () => {
    const order = new order_1.Order(1, ["jamon", "queso"], "M", "PENDING", 100);
    const crud = new mockOrder_1.MockOrder();
    (0, vitest_1.test)('create order', () => {
        (0, vitest_1.expect)(crud.createOrder(order)).toBe(order);
    });
    (0, vitest_1.test)('get order by id', () => {
        (0, vitest_1.expect)(crud.getOrderById(1)).toBe(order);
    });
    (0, vitest_1.test)('get order by status', () => {
        (0, vitest_1.expect)(crud.getOrderByStatus("PENDING")).toEqual([order]);
    });
    (0, vitest_1.test)('cancel order', () => {
        (0, vitest_1.expect)(crud.cancelOrder(1)).toBe(order);
    });
});
//# sourceMappingURL=order.service.test.js.map
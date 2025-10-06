"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockOrder = void 0;
class MockOrder {
    ordersList = [];
    getOrderById(id) {
        return this.ordersList.find(order => order.getId() === id);
    }
    getOrderByStatus(Status) {
        return this.ordersList.filter(order => order.getStatus() === Status);
    }
    createOrder(order) {
        this.ordersList.push(order);
        return order;
    }
    cancelOrder(id) {
        const order = this.getOrderById(id);
        order.setStatus("CANCELLED");
        return order;
    }
}
exports.MockOrder = MockOrder;
//# sourceMappingURL=mockOrder.js.map
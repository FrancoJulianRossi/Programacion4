"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockOrder = void 0;
class MockOrder {
    ordersList = [];
    getOrderById(id) {
        throw new Error('Method not implemented.');
    }
    getOrderByStatus(Status) {
        throw new Error('Method not implemented.');
    }
    createOrder(order) {
        this.ordersList.push(order);
        return order;
    }
    cancelOrder(id) {
        throw new Error('Method not implemented.');
    }
}
exports.MockOrder = MockOrder;
//# sourceMappingURL=mockOrder.js.map
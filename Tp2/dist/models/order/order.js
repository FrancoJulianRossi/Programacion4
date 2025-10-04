"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    id;
    topping;
    size;
    status;
    price;
    constructor(id, topping, size, status, price) {
        this.id = id;
        this.topping = topping;
        this.size = size;
        this.status = status;
        this.price = price;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map
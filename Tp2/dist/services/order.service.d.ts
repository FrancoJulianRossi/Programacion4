import { Order } from '../models/order/order';
export declare const orderService: {
    createOrder(order: Order<number>): Order<number>;
    getOrderById(id: number): Order<number>;
    getOrderByStatus(status: string): Order<number>[];
    cancelOrder(id: number): Order<number>;
};
//# sourceMappingURL=order.service.d.ts.map
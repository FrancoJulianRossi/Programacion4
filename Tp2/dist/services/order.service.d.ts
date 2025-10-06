import { Order } from '../models/order/order';
export declare const orderService: {
    createOrder(order: Order<number>): Promise<Order<number>>;
    getOrderById(id: number): Promise<Order<number>>;
    getOrderByStatus(status: string): Promise<Order<number>[]>;
    cancelOrder(id: number): Promise<Order<number>>;
};
//# sourceMappingURL=order.service.d.ts.map
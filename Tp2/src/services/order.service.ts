import { MockOrder } from '../models/order/mockOrder';
import { Order } from '../models/order/order';

const mockOrder = new MockOrder();

export const orderService = {
    createOrder(order: Order<number>) {
        return mockOrder.createOrder(order);
    },
    getOrderById(id: number) {
        return mockOrder.getOrderById(id);
    },
    getOrderByStatus(status: string) {
        return mockOrder.getOrderByStatus(status);
    },
    cancelOrder(id: number) {
        return mockOrder.cancelOrder(id);
    }
};
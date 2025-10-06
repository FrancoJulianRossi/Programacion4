import { MockOrder } from '../models/order/mockOrder';
import { Order } from '../models/order/order';

const mockOrder = new MockOrder();

export const orderService = {
    createOrder(order: Order<number>) {
        return Promise.resolve(mockOrder.createOrder(order));
    },
    getOrderById(id: number) {
        return Promise.resolve(mockOrder.getOrderById(id));
    },
    getOrderByStatus(status: string) {
        return Promise.resolve(mockOrder.getOrderByStatus(status));
    },
    cancelOrder(id: number) {
        return Promise.resolve(mockOrder.cancelOrder(id));
    }
};
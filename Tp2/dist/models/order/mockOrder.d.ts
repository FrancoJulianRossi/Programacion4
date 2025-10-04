import { OrderCRUD } from './interface/orderCRUD.interface';
import { Order } from './order';
export declare class MockOrder implements OrderCRUD<number> {
    getOrderById(id: number): Order<number>;
    getOrderByStatus(Status: string): Order<number>[];
    createOrder(order: Order<number>): Order<number>;
    cancelOrder(id: number): Order<number>;
}
//# sourceMappingURL=mockOrder.d.ts.map
import { Order } from "../order";
export interface OrderCRUD<ID> {
    getOrderById(id: ID): Order<ID>;
    getOrderByStatus(Status: string): Order<ID>[];
    createOrder(order: Order<ID>): Order<ID>;
    cancelOrder(id: ID): Order<ID>;
}
//# sourceMappingURL=orderCRUD.interface.d.ts.map
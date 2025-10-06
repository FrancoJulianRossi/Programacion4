import {OrderCRUD} from './interface/orderCRUD.interface';
import {Order} from './order';

export class MockOrder implements OrderCRUD<number> {
    private ordersList: Order <number>[] = [];
    getOrderById(id: number): Order<number> {
        return this.ordersList.find(order => order.getId() === id)!;
    }
    getOrderByStatus(Status: string): Order<number>[] {
        return this.ordersList.filter(order => order.getStatus() === Status);
    }
    createOrder(order: Order<number>): Order<number> {
        this.ordersList.push(order);
        return order;
    }
    cancelOrder(id: number): Order<number> {
        const order = this.getOrderById(id);
        order.setStatus("CANCELLED");
        return order;
    }
}
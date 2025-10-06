import {OrderCRUD} from './interface/orderCRUD.interface';
import {Order} from './order';

export class MockOrder implements OrderCRUD<number> {
    private ordersList: Order <number>[] = [];
    getOrderById(id: number): Order<number> {
        throw new Error('Method not implemented.');
    }
    getOrderByStatus(Status: string): Order<number>[] {
        throw new Error('Method not implemented.');
    }
    createOrder(order: Order<number>): Order<number> {
        this.ordersList.push(order);
        return order;
    }
    cancelOrder(id: number): Order<number> {
        throw new Error('Method not implemented.');
    }
}
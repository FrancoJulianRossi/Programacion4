import {OrderCRUD} from './interface/orderCRUD.interface';
import {Order} from './order';

export class MockOrder implements OrderCRUD<number> {
    getOrderById(id: number): Order<number> {
        throw new Error('Method not implemented.');
    }
    getOrderByStatus(Status: string): Order<number>[] {
        throw new Error('Method not implemented.');
    }
    createOrder(order: Order<number>): Order<number> {
        ;
    }
    cancelOrder(id: number): Order<number> {
        throw new Error('Method not implemented.');
    }
}
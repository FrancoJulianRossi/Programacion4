import {test, expect, describe} from 'vitest';
import {Order} from '../../models/order/order';
import {OrderCRUD} from '../../models/order/interface/orderCRUD.interface';
import {MockOrder} from '../../models/order/mockOrder';

describe('test OrderCRUD', () => {
    const order:Order<number> = new Order<number>(1,["jamon","queso"], "M", "PENDING", 100);
    const crud:OrderCRUD<number> = new MockOrder();
    test('create order',() => {
        expect(crud.createOrder(order)).toBe(order);
    })
});
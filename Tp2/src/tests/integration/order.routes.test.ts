import request from 'supertest';
import app from '../../app';
import { orderService } from '../../services/order.service';
import { test, expect, describe } from 'vitest';

describe("Order Routes", () => {
    const newOrder = {
        id: 1,
        topping: ["jamon", "queso"],
        size: "M",
        status: "PENDING",
        price: 100
    };
    test("POST /orders - create order", async () => {
        const response = await request(app).post("/orders").send(newOrder);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.topping).toEqual(newOrder.topping);
        expect(response.body.size).toBe(newOrder.size);
        expect(response.body.status).toBe(newOrder.status);
        expect(response.body.price).toBe(newOrder.price);
    });

});
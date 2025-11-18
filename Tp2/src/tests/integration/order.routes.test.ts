import request from 'supertest';
import makeapp from '../../app';
import { orderService } from '../../services/order.service';
import { test, expect, describe, beforeEach } from 'vitest';

const app = makeapp();

describe("Order Routes", () => {
    const newOrder = {
        id: 1,
        topping: ["jamon", "queso"],
        size: "M",
        status: "PENDING",
        address: "Zapiola 100"
    };


    test("POST /orders - create order", async () => {
        const response = await request(app).post("/orders").send(newOrder);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.topping).toEqual(newOrder.topping);
        expect(response.body.size).toBe(newOrder.size);
        expect(response.body.status).toBe(newOrder.status);
        expect(response.body.price).toBe(190); 
        expect(response.body.address).toBe(newOrder.address);
    });

    test("GET /orders/:id - get orders by id", async () => {
        const response = await request(app).get("/orders/1");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toBe(1);
        expect(response.body.topping).toEqual(newOrder.topping);
        expect(response.body.size).toBe(newOrder.size);
        expect(response.body.status).toBe(newOrder.status);
        expect(response.body.price).toBe(190);
        expect(response.body.address).toBe(newOrder.address);
    });

});

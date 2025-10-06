"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)("Order Routes", () => {
    const newOrder = {
        id: 1,
        topping: ["jamon", "queso"],
        size: "M",
        status: "PENDING",
        price: 100
    };
    (0, vitest_1.test)("POST /orders - create order", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/orders").send(newOrder);
        (0, vitest_1.expect)(response.status).toBe(201);
        (0, vitest_1.expect)(response.body).toHaveProperty("id");
        (0, vitest_1.expect)(response.body.topping).toEqual(newOrder.topping);
        (0, vitest_1.expect)(response.body.size).toBe(newOrder.size);
        (0, vitest_1.expect)(response.body.status).toBe(newOrder.status);
        (0, vitest_1.expect)(response.body.price).toBe(newOrder.price);
    });
});
//# sourceMappingURL=order.routes.test.js.map
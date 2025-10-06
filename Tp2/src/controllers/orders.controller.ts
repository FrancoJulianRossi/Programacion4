import { orderService } from "../services/order.service";
import { Request, Response } from "express";
import { Order } from "../models/order/order";
import { orderSchema, orderIdSchema, orderStatusSchema } from "../schemas/order.schema";

export class OrderController {

    static async createOrder(req: Request, res: Response): Promise<Response> {
    try {
        const parseResult = orderSchema.omit({ price: true }).safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: "Datos inválidos", details: parseResult.error.issues });
        }
        const { id, topping, size, status, address } = parseResult.data;
        const sizePrices = { S: 100, M: 150, L: 200 };
        const toppingPrice = 20;
        const price = sizePrices[size] + topping.length * toppingPrice;

        const orderData = new Order(id, topping, size, status, price, address);
        const newOrder = await orderService.createOrder(orderData);
        if (topping.length === 0) {
            return res.status(422).json({ error: "Debe tener al menos un topping" });
        }
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

    static async getOrderById(req: Request, res: Response): Promise<Response> {
        try {
            const parseResult = orderIdSchema.safeParse(req.params);
            if (!parseResult.success) {
                return res.status(400).json({ error: "ID inválido", details: parseResult.error.issues });
            }
            const id = Number(parseResult.data.id);
            const order = await orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async getOrdersByStatus(req: Request, res: Response): Promise<Response> {
        try { 
            const parseResult = orderStatusSchema.safeParse(req.params);
            if (!parseResult.success) {
                return res.status(400).json({ error: "Status inválido", details: parseResult.error.issues });
            }
            const status = String(req.params.status);
            const orders = await orderService.getOrderByStatus(status);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async cancelOrder(req: Request, res: Response): Promise<Response> {
        try {
            const parseResult = orderIdSchema.safeParse(req.params);
            if (!parseResult.success) {
                return res.status(400).json({ error: "ID inválido", details: parseResult.error.issues });
            }
            const id = Number(parseResult.data.id);
            const order = await orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            if (order.getStatus() === "COMPLETED") {
                return res.status(409).json({ error: "No se puede cancelar una orden completada" });
            }
            const cancelledOrder = await orderService.cancelOrder(id);
            return res.status(200).json(cancelledOrder);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }    
    }
}
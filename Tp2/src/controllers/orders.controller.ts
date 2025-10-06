import { orderService } from "../services/order.service";
import { Request, Response } from "express";
import { Order } from "../models/order/order";

export class OrderController {

    static async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const { id, topping, size, status, price } = req.body;
            const orderData = new Order(id, topping, size, status, price);
            const newOrder = await orderService.createOrder(orderData);
            return res.status(201).json(newOrder);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getOrderById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
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
            const status = String(req.params.status);
            const orders = await orderService.getOrderByStatus(status);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async cancelOrder(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const cancelledOrder = await orderService.cancelOrder(id);
            if (!cancelledOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            return res.status(200).json(cancelledOrder);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }    
    }
}
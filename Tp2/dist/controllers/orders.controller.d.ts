import { Request, Response } from "express";
export declare class OrderController {
    static createOrder(req: Request, res: Response): Promise<Response>;
    static getOrderById(req: Request, res: Response): Promise<Response>;
    static getOrdersByStatus(req: Request, res: Response): Promise<Response>;
    static cancelOrder(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=orders.controller.d.ts.map
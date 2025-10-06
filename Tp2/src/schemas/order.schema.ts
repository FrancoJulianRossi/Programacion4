import { z } from "zod";

export const orderSchema = z.object({
    id: z.number().min(1),
    topping: z.array(z.string()).min(1).max(5),
    size: z.enum(["S", "M", "L"]),
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
    price: z.number().min(0),
    address: z.string().min(10), 
});

export const orderIdSchema = z.object({
    id: z.string().regex(/^\d+$/)
});

export const orderStatusSchema = z.object({
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"])
});


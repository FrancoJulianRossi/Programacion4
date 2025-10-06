export type size = 'S' | 'M' | 'L';
export type status = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export declare class Order<ID> {
    protected id: ID;
    protected topping: string[];
    protected size: size;
    protected status: status;
    protected price: number;
    constructor(id: ID, topping: string[], size: size, status: status, price: number);
    getId(): ID;
    getStatus(): status;
    setId(id: ID): void;
    setStatus(status: status): void;
}
//# sourceMappingURL=order.d.ts.map
export type size = 'S' | 'M' | 'L';
export type status = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export class Order<ID> {
    constructor(
        protected id:ID,
        protected topping: string[],
        protected size: size,
        protected status: status,
        protected price: number
    ){}
}
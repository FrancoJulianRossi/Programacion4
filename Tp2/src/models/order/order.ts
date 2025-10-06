export type size = 'S' | 'M' | 'L';
export type status = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export class Order<ID> {
    constructor(
        protected id:ID,
        protected topping: string[],
        protected size: size,
        protected status: status,
        protected price: number,
        protected address: string,
    ){}
    // Getters
    getId():ID{
        return this.id;
    }
    getStatus():status{
        return this.status;
    }
    // Setters
    setId(id:ID):void{
        this.id = id;
    }
    setStatus(status:status):void{
        this.status = status;
    }
}
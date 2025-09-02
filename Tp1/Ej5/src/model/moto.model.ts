import { Vehiculo } from "./vehiculo.model";

export class Moto extends Vehiculo{
    protected cilindrada: number;

    constructor(marca: string, modelo: string, anio: number, velocidadActual: number, combustible: string, cilindrada: number) {
        super(marca, modelo, anio, velocidadActual, combustible);
        this.cilindrada = cilindrada;
    }

    info(): void {
        super.info();
        console.log(`Cilindrada: ${this.cilindrada}`); 
    }
}
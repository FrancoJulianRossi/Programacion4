import { Vehiculo } from "./vehiculo.model";

export class Auto extends Vehiculo{
    protected asientos: number;
    protected tipo: string;

    constructor(marca: string, modelo: string, anio: number, velocidadActual: number, combustible: string, asientos: number, tipo: string) {
        super(marca, modelo, anio, velocidadActual, combustible);
        this.asientos = asientos;
        this.tipo = tipo
    }

    info(): void {
        super.info();
        console.log(`Asientos: ${this.asientos}`); 
        console.log(`Tipo: ${this.tipo}`); 
    }
}
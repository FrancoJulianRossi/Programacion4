import { Auto } from "./auto.model";
import { Electrico } from "./electrico.interface";

export class AutoElectrico extends Auto implements Electrico {
    capacidadBateria: number;
    bateriaTotal: number;
    constructor(
        marca: string, 
        modelo: string, 
        anio: number, 
        velocidadActual: number, 
        combustible: string, 
        asientos: number, 
        tipo: string,
        capacidadBateria: number,
        bateriaTotal: number
    ) {
        super(marca, modelo, anio, velocidadActual, combustible, asientos, tipo);
        this.capacidadBateria = capacidadBateria;
        this.bateriaTotal = bateriaTotal;
    }
    info(): void {
        super.info();
        console.log(`Capacidad de Bateria: ${this.capacidadBateria}`); 
        console.log(`Bateria Total: ${this.bateriaTotal}`);
    }
    cargarBateria(): void {
        this.bateriaTotal = this.capacidadBateria;
    }
    gastarBateria(): void {
        if (this.bateriaTotal > 0){
            this.bateriaTotal -= 10;
        }else{
            console.log("Bateria descargada");
        }
    }
}
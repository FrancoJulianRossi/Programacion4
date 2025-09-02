export abstract class Vehiculo{
    protected marca: string;
    protected modelo: string;
    protected anio: number;
    protected velocidadActual: number;
    protected combustible: string;

    constructor(marca: string, modelo: string, anio: number, velocidadActual: number, combustible: string){
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.velocidadActual = velocidadActual;
        this.combustible = combustible;
    }

    acelerar(){
        this.velocidadActual += 10;
        console.log(`${this.marca} ${this.modelo} Acelerando a ${this.velocidadActual} km/h`);
    }

    frenar(){
        if (this.velocidadActual <= 0){
            console.log(`${this.marca} ${this.modelo} Ya está detenido`);
            return;
        }else{
            this.velocidadActual -= 10;
            console.log(`${this.marca} ${this.modelo} Frenando a ${this.velocidadActual} km/h`);
        }
    }
    info(){
        console.log(`Marca: ${this.marca}`);
        console.log(`Modelo: ${this.modelo}`);
        console.log(`Año: ${this.anio}`);
        console.log(`Velocidad Actual: ${this.velocidadActual} km/h`);
        console.log(`Combustible: ${this.combustible}`);
    }
}
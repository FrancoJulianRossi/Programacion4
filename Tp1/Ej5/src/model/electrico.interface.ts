export interface Electrico{
    capacidadBateria:number;
    bateriaTotal:number;
    cargarBateria():void;
    gastarBateria():void;
}
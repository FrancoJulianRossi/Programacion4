import { Auto } from "./model/auto.model";
import { AutoElectrico } from "./model/autoElectrico.model";
import { Moto } from "./model/moto.model";

let auto1 = new Auto("Toyota", "Corolla", 2020, 0, "Gasolina", 5, "Sedan");
let moto1 = new Moto("Honda", "CBR500R", 2021, 0, "Gasolina", 200);
let autoElectrico1 = new AutoElectrico("Tesla", "Model 3", 2022, 0, "Eléctrico", 5, "Sedan", 100, 80);

auto1.acelerar();
moto1.acelerar();
autoElectrico1.acelerar();

auto1.frenar();
moto1.frenar();
autoElectrico1.frenar();

console.log("-----");
auto1.info();
console.log("-----");
moto1.info();
console.log("-----");
autoElectrico1.info();


autoElectrico1.gastarBateria();
autoElectrico1.gastarBateria();
autoElectrico1.gastarBateria();


//Tenemos una clase abstracta Animal con un atributo nombre protegido y un método abstracto hacerSonido().
//Luego tenemos dos clases que heredan de animal: Pajaro y Zorro.
//La clase Pajaro implementa una interfaz Volador y tiene un atributo especie.
//La clase Zorro tiene tambien un atributo especie.
//La interfaz Volador tiene un metodo volar()


abstract class Animal {
    protected nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    abstract hacerSonido(): void;
}

interface Volador {
    volar(): void;
}

class Pajaro extends Animal implements Volador {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(`pio pio`);
    }

    volar(): void {
        console.log(`está volando.`);
    }
}

class Zorro extends Animal{
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(`grrr grrr`);
    }
}

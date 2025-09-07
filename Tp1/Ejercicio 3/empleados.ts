abstract class Empleado {
  constructor(public nombre: string, public salarioBase: number) {}

  abstract calcularSalario(): number;
}

class EmpleadoTiempoCompleto extends Empleado {
  private bonoFijo: number = 20000;

  calcularSalario(): number {
    return this.salarioBase + this.bonoFijo;
  }
}

class EmpleadoMedioTiempo extends Empleado {
  calcularSalario(): number {
    return this.salarioBase * 0.5;
  }
}

const empleados: Empleado[] = [
  new EmpleadoTiempoCompleto("Carlos", 50000),
  new EmpleadoMedioTiempo("Ana", 40000),
  new EmpleadoTiempoCompleto("Lucía", 60000),
  new EmpleadoMedioTiempo("Pedro", 30000),
];

empleados.forEach((empleado) => {
  console.log(
    `${empleado.nombre} tiene un salario calculado de: $${empleado.calcularSalario()}`
  );
});

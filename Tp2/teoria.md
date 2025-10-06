# TEORÍA DE TESTING

## 1. Ciclo Rojo → Verde → Refactor
El ciclo **Rojo → Verde → Refactor** pertenece al enfoque **TDD**. Consiste en:  
1. **Rojo**: escribir un test que falle (define el comportamiento esperado).  
2. **Verde**: implementar el código mínimo necesario para que pase el test.  
3. **Refactor**: mejorar el código manteniendo los tests verdes.  

## 2. Tests unitarios, de integración y E2E en APIs
- **Unitarios**: prueban funciones o módulos aislados (p. ej., lógica de negocio o validaciones).  
- **Integración**: validan que distintos módulos (p. ej. controlador + base de datos) funcionen correctamente juntos.  
- **E2E (End-to-End)**: simulan el uso real de la API, desde las rutas hasta la persistencia, como si un cliente externo hiciera las peticiones.

## 3. Dobles de prueba: mock, stub y spy
Un **doble de prueba** reemplaza dependencias reales para aislar el código bajo test.  
- **Stub**: devuelve respuestas predefinidas, útil para evitar dependencias externas.  
- **Mock**: verifica interacciones esperadas (llamadas, argumentos). Ideal para probar flujos de comunicación.  
- **Spy**: observa las llamadas reales sin modificar el comportamiento. Útil cuando se quiere verificar efectos secundarios.

## 4. Separar app de server
Separar `app` de `server` permite testear la aplicación sin levantar el servidor real.  
```js
// app.js
import express from "express";
export function makeApp() {
  const app = express();
  app.get("/ping", (req, res) => res.json({ ok: true }));
  return app;
}

// server.js
import { makeApp } from "./app.js";
makeApp().listen(3000);

// app.test.js
import request from "supertest";
import { makeApp } from "./app.js";
test("GET /ping responde ok", async () => {
  const res = await request(makeApp()).get("/ping");
  expect(res.body.ok).toBe(true);
});
```
# 5. Zod: parse vs safeParse

parse() lanza una excepción si los datos no son válidos.

safeParse() devuelve un objeto { success, data/error } sin lanzar errores.
En una ruta Express conviene usar safeParse para manejar errores y responder con 400, mientras que parse se usa internamente cuando ya se confía en los da.

# 6. Reglas de dominio a probar con tests unitarios

Ejemplos:

No permitir ventas con stock insuficiente (throw new Error("Stock insuficiente")).

Calcular descuentos sólo si el cliente tiene categoría “premium” o compra mínima.
Estas pruebas garantizan reglas de negocio más allá de la validación de inputs.

# 7. Malos olores en suites de tests

Nombres poco descriptivos: test("funciona") no explica la intención.

Duplicación de setup o datos: difícil de mantener.

Mocks frágiles: tests fallan ante cambios internos no relevantes.
Otros olores comunes incluyen asserts débiles o exceso de dependencias externas.

# 8. Criterios de aceptación ↔ Tests

Trazar criterios ayuda a garantizar cobertura funcional.

| Criterio de aceptación                                   | Test asociado                                               |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| Usuario puede crear producto con nombre y precio válidos | `POST /productos` responde 201                              |
| No se permite crear producto sin nombre                  | `POST /productos` responde 400 con error “nombre requerido” |

# 9. No perseguir 100% de cobertura

Buscar 100% de cobertura puede llevar a tests artificiales o costosos de mantener.
Riesgos: perder foco en la calidad de los asserts, cubrir código sin valor, o generar falsos positivos que dan una falsa sensación de seguridad.

# 10. Helper/Builder para tests

Un helper o builder crea objetos o datos de prueba de forma consistente y reusable.
Ejemplo:
```js
function makeProduct(overrides = {}) {
  return {
    name: "Producto test",
    price: 100,
    stock: 5,
    ...overrides
  };
}
// Uso en test
const p = makeProduct({ stock: 0 });
expect(() => vender(p)).toThrow("Stock insuficiente");
```
# User stories

## US1

Como cliente quiero pedir una pizza de X tamaño y con X toppings

## US2

Como cliente quiero consultar una orden por id

## US3

Como cliente quiero cancelar una orden salvo que ya este entregada

## US4

Como empleado quiero listar ordenes por empleado



## 🧩 Historias de Usuario Implementadas

## 🧾 Matriz de Casos (CA ↔ Tests)


| ID   | Caso / Descripción                              | Precondición                          | Input                                                | Acción                          | Resultado esperado                                                         | Test                                |
|------|--------------------------------------------------|----------------------------------------|-------------------------------------------------------|---------------------------------|------------------------------------------------------------------------------|--------------------------------------|
| CA1  | Crear pedido válido                             | El servidor está en ejecución         | `{ "size": "M", "toppings": ["muzza", "aceitunas"] }` | Enviar `POST /orders`           | Devuelve **201 Created** con el pedido creado, precio calculado y `status = pending`. | `orders.routes.test.ts` (integración) |
| CA2  | Obtener pedido por ID existente                 | Existe un pedido con `id = 1`         | `GET /orders/1`                                      | Consultar pedido por ID         | Devuelve **200 OK** con los datos del pedido correspondiente.              | `orders.routes.test.ts` (integración) |
| CA3  | Cancelar pedido pendiente                       | Pedido con `status = pending`         | `POST /orders/1/cancel`                              | Solicitar cancelación del pedido | Devuelve **200 OK** y cambia `status` a `canceled`.                        | `orders.service.test.ts` (unit) + `orders.routes.test.ts` |
| CA4  | Listar pedidos filtrados por estado             | Existen pedidos con distintos estados | `GET /orders?status=pending`                         | Consultar pedidos por estado    | Devuelve **200 OK** con una lista de pedidos con `status = pending`.       | `orders.routes.test.ts` (integración) |
| ERR1 | Crear pedido con lista vacía de ítems           | Ninguna                               | `{ "size": "L", "toppings": [] }`                    | `POST /orders`                  | Devuelve **422 Unprocessable Entity** con mensaje: `"Debe incluir al menos un ítem"`. | `orders.routes.test.ts` (integración) |
| ERR2 | Cancelar pedido entregado                       | Pedido con `status = delivered`       | `POST /orders/5/cancel`                              | Solicitar cancelación del pedido | Devuelve **409 Conflict** con mensaje: `"No se puede cancelar un pedido entregado"`. | `orders.service.test.ts` (unit) + `orders.routes.test.ts` |
| ERR3 | Tamaño inválido en pedido                       | Ninguna                               | `{ "size": "XL", "toppings": ["jamón"] }`            | `POST /orders`                  | Devuelve **422 Unprocessable Entity** con mensaje: `"El tamaño debe ser S, M o L"`. | `orders.routes.test.ts` (integración) |
| ERR4 | Pedido no encontrado al consultar por ID         | No existe un pedido con `id = 99`     | `GET /orders/99`                                     | Consultar pedido inexistente    | Devuelve **404 Not Found** con mensaje: `"Pedido no encontrado"`.          | `orders.routes.test.ts` (integración) |

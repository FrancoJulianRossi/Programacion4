import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Order from "../components/order";
import Menu from "../components/menu";
import { OrderProvider } from "../context/useOrder";

describe("Visualizacion inicial del pedido", () => {
  test("Simular click sobre el boton agregar de un producto", async () => {
    render(
      <OrderProvider>
        <Menu />
        <Order />
      </OrderProvider>
    );

    const addButtons = await screen.findAllByRole("button", {
      name: /agregar/i,
    });
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);

    const orderList = screen.getByRole("list", { name: /pedido/i });
    await waitFor(() => {
      expect(orderList).toHaveTextContent("Cafe");
    });
  });

  test("HU3 — Calcular total del pedido", async () => {
    render(
      <OrderProvider>
        <Menu />
        <Order />
      </OrderProvider>
    );

    const addButtons = await screen.findAllByRole("button", { name: /agregar/i });
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    expect( screen.getByText(/Total: \$\d+/i)).toBeInTheDocument();
  })

  test("HU4 — Eliminar un item del pedido", async () => {
    render(
      <OrderProvider>
        <Menu />
        <Order />
      </OrderProvider>
    );

    const addButtons = await screen.findAllByRole("button", { name: /agregar/i });
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    const removeButtons = await screen.findAllByRole("button", { name: /eliminar/i });
    fireEvent.click(removeButtons[0]);


    expect( screen.queryByText(/Total: \$\d+/i)).toBeInTheDocument();
    })
});

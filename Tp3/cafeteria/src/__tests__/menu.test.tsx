import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Menu from "../components/menu";
import { OrderProvider } from "../context/useOrder";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

describe("Visualizacion inicial del menu", () => {
  test("HU1 - muestra productos del menú obtenidos de la API", async () => {
    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );

    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/Cafe/)).toBeInTheDocument();
  });

  test("muestra mensaje de error si la API falla", async () => {
    server.use(
      http.get("/api/menu", () => HttpResponse.json({}, { status: 500 }))
    );

    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error al cargar menú/i)).toBeInTheDocument();
    });
  });

  test("muestra mensaje si el menú está vacío", async () => {
    // Simulamos lista vacía
    server.use(
      http.get("/api/menu", () => HttpResponse.json({ menu: [] }))
    );

    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/no hay productos disponibles/i)
      ).toBeInTheDocument();
    });
  });
});

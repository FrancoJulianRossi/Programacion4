import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Order from '../components/order';
import Menu from '../components/menu';
import { OrderProvider } from "../context/useOrder";

describe('Visualizacion inicial del pedido', () => {
    test("Simular click sobre el boton agregar de un producto", async () => {
        render(<Order />);
    })
})
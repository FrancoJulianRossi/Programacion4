import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Menu from '../components/menu';
import { OrderProvider } from '../context/useOrder';

describe('Visualizacion inicial del menu', () => {
    test("muestra productos del menú obtenidos de la API", async () => {
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
    
})


import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from '../App';

describe('Visualizacion inicial del menu', () => {
    test("Ver un listado de productos disponibles", async () => {
        render( App() );

        expect(screen.getByText("Cafe")).toBeInTheDocument();
    })
})
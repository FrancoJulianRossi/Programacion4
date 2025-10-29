import { useEffect, useState } from "react";
import type { Product } from "../schemas/product";

type UseMenuResult = {
    products: Product[];
    error: string;
};

export const useMenu = (): UseMenuResult => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/menu")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.menu)) {
                    setProducts(data.menu);
                } else {
                    setProducts([]);
                }
            })
            .catch((err) => {
                // keep a user-facing message in Spanish to match tests
                console.error(err);
                setError("Error al cargar menú");
            });
    }, []);

    return { products, error };
};
import {useEffect, useState} from 'react';
import type { Product } from '../schemas/product';

export const useMenu = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(()=> {
        fetch("/api/menu")
        .then((res) => res.json())
        .then((data) => {
            if (data && Array.isArray(data.menu)) {
                setProducts(data.menu);
            } else {
                setProducts([]);
            }
        })
        .catch(console.error);
    }, []);
    
    return products;
}
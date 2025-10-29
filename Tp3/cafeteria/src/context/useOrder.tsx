import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type{ Product } from "../schemas/product";

type OrderContextType = {
  order: Product[];
  total: number;
  addToOrder: (product: Product) => void;
  removeFromOrder: (id: number) => void;
  sendOrder: () => Promise<string>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Product[]>([]);

  const addToOrder = (product: Product) => {
    setOrder((prev) => [...prev, product]);
  };

  const removeFromOrder = (id: number) => {
    setOrder((prev) => prev.filter((p) => parseInt(p.id) !== id));
  };

  const total = useMemo(() => {
    return order.reduce((acc, product) => acc + product.price, 0);
  }, [order]);

  const sendOrder = async (): Promise<string> => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await response.json();
    if (data.success) {
      setOrder([]);
      return data.message;
    } else {
      throw new Error("Error al enviar el pedido");
    }
  };

  return (
    <OrderContext.Provider value={{ order, total, addToOrder, removeFromOrder, sendOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder debe usarse dentro de OrderProvider");
  return context;
};

import { useOrder } from "../context/useOrder";
import { useMenu } from "../hooks/useMenu";

const Menu = () => {
  const { products, error } = useMenu();
  const { addToOrder } = useOrder();

  if (error) return <p>{error}</p>;

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - ${p.price.toFixed(2)}
          <button onClick={() => addToOrder(p)}>agregar</button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;

import {useMenu} from '../hooks/useMenu';
import {useOrder} from '../context/useOrder';

const Menu = () => {
    const products = useMenu();
    const { addToOrder } = useOrder();
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

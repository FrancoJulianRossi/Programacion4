import {useMenu} from '../hooks/useMenu';

const Menu = () => {
    const products = useMenu();
    return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - ${p.price.toFixed(2)}
        
        </li>
      ))}
    </ul>
  );
};

export default Menu;

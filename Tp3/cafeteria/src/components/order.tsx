import { useState } from "react";
import { useOrder } from "../context/useOrder";

const Order = () => {
  const { order, total, removeFromOrder, sendOrder } = useOrder();
  const [message, setMessage] = useState("");

  const handleSendOrder = async () => {
    const msg = await sendOrder();
    setMessage(msg);
  };
  return (
    <section>
      <h2>Pedido</h2>
      <ul role="list" aria-label="pedido">
        {order.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price.toFixed(2)}
            <button onClick={(e) =>{
                e.stopPropagation();
                removeFromOrder(parseInt(p.id))}}>
                    Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>

      {order.length > 0 && (
        <button onClick={handleSendOrder}>Enviar pedido</button>
      )}

      {message && <p>{message}</p>}
    </section>
  )
}

export default Order;
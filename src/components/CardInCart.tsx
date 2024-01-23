import React, { useState } from "react";
import "../css/CardInCart.css";

interface CardInCart {
  card: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

const CardInCart: React.FC<CardInCart> = ({ card }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setQuantity(isNaN(value) ? 1 : value);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <div className="cart-card">
        
      <div className="card-details">
        <img src={card.image} alt={card.name} className="img-card" />
        <div className="card-label">
          <h3>{card.name}</h3>
          <p> $ {card.price}</p>
        </div>
        <p>$ {card.price * quantity}</p>
      </div>
      <div className="quantity-controls">
      <button onClick={handleDecrease}>-</button>
        <input type="number" value={quantity} onChange={handleQuantityChange} className="quantity-input" />
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
};

export default CardInCart;

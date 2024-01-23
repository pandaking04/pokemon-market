import React, { useState } from "react";
import "../css/CardComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  image: string;
  name: string;
  price: number;
  stock: number;
  onAddToCart: (item: any) => void;
}
const CardComponents: React.FC<CardProps> = ({ image, name, price, stock, onAddToCart }) => {
    const [addedToCart, setAddedToCart] = useState(false);
  const handleAddToCart = () => {
    const item = {
        image,
        name,
        price,
        stock,
      };
      
      
      onAddToCart(item);
      setAddedToCart(true);
  };
  return (
    <div className={`card ${addedToCart ? "added-to-cart" : ""}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div className="card-info">
        <p>${price}</p>
        <p>{stock} Cards</p>
      </div>

      <button onClick={handleAddToCart} disabled={addedToCart} className="cart-btn">
        <FontAwesomeIcon
          icon={faShoppingCart}
          style={{ marginRight: "10px" }}
        />
        {addedToCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default CardComponents;

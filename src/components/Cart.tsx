import React from "react";
import "../css/Cart.css";
import CardInCart from "./CardInCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cardsInCart: {
    id: string;
    name: string;
    image: string;
    price: number;
  }[];
  setCardsInCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cardsInCart,
  setCardsInCart,
}) => {
  const handleClearAll = () => {
    setCardsInCart([]);
  };
  const totalItems = cardsInCart.reduce((total, card) => total + 1, 0);
  const totalPrice = cardsInCart.reduce((total, card) => total + card.price, 0);
  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="header-cart">
        <div>
          <h2>Cart</h2>
          <button onClick={handleClearAll} className="clear-all">
            Clear all
          </button>
        </div>

        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="cart-header">
        <p>Item</p>
        <p>Qty</p>
        <p>Price</p>
      </div>
      <div className="cart-content">
        {cardsInCart.map((card) => (
          <CardInCart key={card.id} card={card} />
        ))}
      </div>
      <div className="cashOut">
        <div className="allAmount">
          <p>Total card amount</p>
          <p>{totalItems}</p>
        </div>
        <div className="allPrice">
          <p>Total price</p>
          <p>$ {totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="btnContainer">
        <button className="payment-Btn">Continue to Payment</button>
      </div>
    </div>
  );
};

export default Cart;

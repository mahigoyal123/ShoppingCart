import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Styles/Cart.css";
import CartItemCard from "./CartItemCard";
import emptyCartImage from "../Img/empty-cart.png";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalItems = Object.values(cartItems);
    setItems(totalItems);
    let sum = totalItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    setTotalPrice(sum);
  }, [cartItems]);

  return (
    <div>
      <div className="trs-cart-container">
        {items.length != 0 && <h3>Shopping Cart:</h3>}
        <div>
          {items.length > 0 &&
            items.map((item) => (
              <CartItemCard
                key={item.id}
                allItems={cartItems}
                cartItem={item}
              />
            ))}
        </div>
        {items.length != 0 && (
          <div className="trs-cart-card-container">
            <h2 className="trs-align-center">
              Total Amount: &nbsp;
              <span className="trs-total"> Rs {totalPrice}</span>
            </h2>
          </div>
        )}
      </div>
      {items.length == 0 && (
          <div className="empty-cart">
            <img src={emptyCartImage} alt="empty cart" />
          </div>
        )}
    </div>
  );
};

export default Cart;

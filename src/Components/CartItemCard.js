import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../Utils/cartSlice";
import { removeItemFromCart } from "../Utils/cartSlice";

const CartItemCard = ({ cartItem }) => {
  const { id, imageURL, name, type, price, color, quantity, totalQuantity } =
    cartItem;
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedOption(`Qty: ${quantity}`);
  }, [quantity]);

  const onSelectHandler = (e) => {
    setSelectedOption(e.target.value);
    let q = e.target.value.split(":")[1].trim();
    dispatch(changeQuantity({ id: id, quantity: +q }));
  };

  const deleteItemFromCart = () => {
    dispatch(removeItemFromCart({ id: id }));
  };

  return (
    <div className="trs-cart-card-container">
      <div className="trs-cart-card-img-container">
        <img src={imageURL} alt={name} width="100" height="110" />
      </div>
      <div className="trs-cart-card-price">
        <p>{name}</p>
        <span>Rs {price}</span>
      </div>
      <div className="trs-cart-card-quantity">
        <select value={selectedOption} onChange={onSelectHandler}>
          {[...new Array(totalQuantity).keys()].map((item, i) => (
            <option key={i + 1}>{`Qty: ${i + 1}`}</option>
          ))}
        </select>
      </div>
      <div className="trs-cart-card-delete">
        <button onClick={deleteItemFromCart}>Delete</button>
      </div>
    </div>
  );
};

export default CartItemCard;

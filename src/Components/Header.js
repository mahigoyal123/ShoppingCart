import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartIcon from "../Img/cart.svg";
import "../Styles/Header.css";

const Header = () => {
  const cartItem = useSelector((store) => store.cart.items);
  return (
    <div className="trs-header-bg">
      <header className="trs-header-container">
        <h1 className="trs-logo">
          <Link to="/">Shopping Cart</Link>
        </h1>
        <ul>
          <li className="trs-product-link"><Link to='/'>Products</Link></li>
          <li>
            <div className="trs-cart">
              <Link to="/cart">
                <img src={cartIcon} width="26" height="26" alt="cart-icon" />
              </Link>
              <span className="trs-cart-value">
                {Object.keys(cartItem).length == 0
                  ? ""
                  : Object.keys(cartItem).length}
              </span>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;

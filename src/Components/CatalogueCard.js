import React,{useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/CatalogueCard.css";
import { addItemToCart, addMoreItem, removeMoreItem } from "../Utils/cartSlice";
import plusIcon from "../Img/plus.svg";
import minusIcon from "../Img/minus.svg";
import { useLocation, useRoutes } from "react-router-dom";

const CatalogueCard = ({ singleCatalogue, location, currentCartData }) => {
  const dispatch = useDispatch();
  const { id, imageURL, name, type, price, currency, color, gender, quantity } =
    singleCatalogue;
  const [currState, setCurrState] = useState(true);
  const [error, setError] = useState(false);
  const [noAvailableError, setNoAvailableError] = useState();
  const timer = useRef(null);

  const addToCartHandler = () => {
    if(quantity >= 1){
        dispatch(addItemToCart({ ...singleCatalogue, quantity: 1, totalQuantity: quantity }));
        setCurrState(false);
    }else{
        setNoAvailableError(true);
        timer.current = setTimeout(() => {
            setNoAvailableError(true);
            clearTimeout(timer.current);
        }, 2000);
    }
  };

  const getSelectedCartData = (id) => {
    return currentCartData[id];
  }

  useEffect(() => {
    return () => {clearTimeout(timer.current)}
  }, [timer]);

  useEffect(() => {
     if(getSelectedCartData(id))
     {
        setCurrState(false);
     }
  }, [location]);

  const removeMoreItemFromCartHandler = () => {
    dispatch(removeMoreItem(singleCatalogue));
    setError(false);
    if(getSelectedCartData(id).quantity == 1)setCurrState(true);
  };

  const addMoreItemToCartHandler = () => {
    if(+getSelectedCartData(id).quantity+1 > +quantity)
    {
        setError(true);
        return;
    }
    dispatch(addMoreItem(singleCatalogue));
  };

  return (
    <div className="trs-card-container">
      <div className="trs-image-container">
        <h2>{name}</h2>
        <img width="100%" height="170" src={imageURL} alt={name} />
      </div>
      <div className="trs-card-footer">
        <h3>Rs {price}</h3>
        {currState && <button onClick={addToCartHandler}>Add to cart</button>}
        {!currState && (
          <div className="trs-btn-list">
            <span>
              <img
                width="20"
                onClick={removeMoreItemFromCartHandler}
                src={minusIcon}
                alt="minus-icon"
              />
            </span>
            <span>{getSelectedCartData(id)?.quantity}</span>
            <span>
              <img
                width="20"
                onClick={addMoreItemToCartHandler}
                src={plusIcon}
                alt="plus-icon"
              />
            </span>
          </div>
        )}
      </div>
      {error && <span className="trs-error">Only {quantity} quantity available.</span>}
      {noAvailableError && <span className="trs-error">Item not available</span>}
    </div>
  );
};

export default CatalogueCard;

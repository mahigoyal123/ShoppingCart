import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../Utils/catalogueSlice";
import { getCatalogue } from "../API/getCatalogue";
import CatalogueCard from "./CatalogueCard";
import "../Styles/CatalogueContainer.css";
import { useLocation } from "react-router-dom";
import { initilizeList } from "../Utils/filterSlice";

const CatalogueContainer = () => {
  const dispatch = useDispatch();
  const [currentCatalogueList, setCurrentCatalogueList] = useState([]);
  const catalogueList = useSelector((store) => store.catalogue.list);
  const filteredList = useSelector((store) => store.filter.list);
  const location = useLocation();
  const currentCartData = useSelector((store) => store.cart.items);

  const mount = useRef(null);
  useEffect(() => {
    if (mount.current) return;
    mount.current = true;

    if (catalogueList.length == 0) {
      getCatalogue()
        .then((res) => {
          console.log(res);
          dispatch(addList(res));
          dispatch(initilizeList(res));
          setCurrentCatalogueList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCurrentCatalogueList(catalogueList);
      dispatch(initilizeList(catalogueList));
    }
  }, []);

  useEffect(() => {
    setCurrentCatalogueList(filteredList);
  }, [filteredList]);

  return (
    <div className="trs-catalogue-container">
      {currentCatalogueList.length > 0 &&
        currentCatalogueList.map((item) => (
          <CatalogueCard
            location={location}
            key={item.id}
            singleCatalogue={item}
            currentCartData={currentCartData}
          />
        ))}

        {
          currentCatalogueList.length == 0  && <div className="trs-no-result">Result Not found</div>  
        }
    </div>
  );
};

export default CatalogueContainer;

import React, { useState } from "react";
import CatalogueContainer from "./CatalogueContainer";
import "../Styles/MainContainer.css";
import searchIcon from "../Img/search.svg";
import filterIcon from "../Img/filter.svg";
import { useDispatch, useSelector } from "react-redux";
import { searchIntoList, resetList } from "../Utils/filterSlice";
import { toggleFilterMenu } from "../Utils/appSlice";
import FilterCatalogue from "./FilterCatalogue";

const MainContainer = () => {
  const dispatch = useDispatch();
  const allCatalogue = useSelector((store) => store.catalogue.list);
  const filterMenu = useSelector((store) => store.app.filterMenu);

  const [searchedValue, setSearchedValue] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    let obj = { list: allCatalogue, searchedItem: searchedValue };
    console.log(obj);
    dispatch(searchIntoList(obj));
  };

  const searchChange = (e) => {
    setSearchedValue(e.target.value);
    if (e.target.value == "") dispatch(resetList(allCatalogue));
  };

  const filterMenuToggler = () => {
    dispatch(toggleFilterMenu());
  };

  return (
    <div className="trs-main-container">
      <form onSubmit={searchHandler} className="trs-search-container">
        <input
          value={searchedValue}
          onChange={(e) => searchChange(e)}
          placeholder="Search for products..."
          type="search"
        />
        <button type="submit" className="trs-search-btn">
          <img src={searchIcon} alt="search-icon" />
        </button>
        <button onClick={filterMenuToggler} className="trs-search-btn trs-filter-btn">
          <img src={filterIcon} alt="filter-icon" />
        </button>
      </form>
      <div>
        <CatalogueContainer />
      </div>
      {filterMenu && (
        <div className="trs-menu">
          <div className="trs-close-container">
            <div className="trs-close" onClick={filterMenuToggler}>
              Close
            </div>
          </div>
          <FilterCatalogue />
        </div>
      )}
    </div>
  );
};

export default MainContainer;

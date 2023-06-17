import React from 'react';
import '../Styles/UiLayout.css';
import FilterCatalogue from './FilterCatalogue';
import MainContainer from './MainContainer';

const Body = () => {
  return (
    <div className="trs-body-container">
        <div className='trs-show-hide'>
           <FilterCatalogue />
        </div>
        <MainContainer />
    </div>
  )
}

export default Body
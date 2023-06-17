import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, TYPE, PRICE, GENDER } from "../Helper/Constant";
import '../Styles/FilterCatalogue.css';
import { filterList, resetList } from "../Utils/filterSlice";

const FilterCatalogue = () => {
    const lists = useSelector(store => store.catalogue.list);
    const dispatch = useDispatch();

    const [colors, setColors] = useState([]);
    const [types, setTypes] = useState([]);
    const [genders, setGenders] = useState([]);
    const [prices, setPrices] = useState([]);
    const [allCategory, setAllCategory] = useState({});

    useEffect(() => {
      let arr;
      arr = COLOR.map(item => {
        return {
            id: item,
            entity: item?.toLowerCase(),
            checked: false,
            value: item
        }
      });
      setColors(arr);
      arr = TYPE.map(item => {
        return {
            id: item,
            entity: item?.toLowerCase(),
            checked: false,
            value: item
        }
      })
      setTypes(arr);
      arr = GENDER.map(item => {
        return {
            id: item,
            entity: item?.toLowerCase(),
            checked: false,
            value: item
        }
      });
      setGenders(arr);
      arr = PRICE.map(item => {
        return {
            id: item[0],
            entity: item,
            checked: false,
            value: item
        }
      })
      setPrices(arr);
    }, [COLOR, TYPE, PRICE, GENDER]);

    useEffect(() => {
        setAllCategory({...allCategory, list: lists})
    }, [lists]);

    const setCheck = (item, entity, checked) => {
        return item.entity == entity ? {...item, checked: checked} : item;
    }

    const filterTypeList = (list) => {
        list = list.filter(item => item.checked);
        return list.map(item => item.entity);
    };
    
    const changeHandler = (e, type, entity) => {
      let checked = e.target.checked;
      let allCate = {...allCategory, list: lists};
      let userSelected = allCategory?.userSelected ? {...allCategory.userSelected} : {};
      switch(type)
      {
        case 'color':
           let color = [...colors];
           color = color.map((item) => {
            return setCheck(item, entity, checked);
           });
           setColors(color);
           userSelected['color'] = filterTypeList(color);
           break;

        case 'type':
            let type = [...types];
            type = type.map((item) => {
                return setCheck(item, entity, checked);
            })
            setTypes(type);
            userSelected['type'] = filterTypeList(type);
            break;

        case 'gender':
            let gender = [...genders];
            gender = gender.map((item) => {
                return setCheck(item, entity, checked);
            });
            setGenders(gender);
            userSelected['gender'] = filterTypeList(gender);
            break;
            
        case 'price':
            let price = [...prices];
            price = price.map((item) => {
                return setCheck(item, entity, checked);
            });
            setPrices(price);
            userSelected['price'] = filterTypeList(price);
            break;      
      }
      allCate['userSelected'] = userSelected;
      setAllCategory(allCate);
      let allblank = true;
      for(let key in userSelected)
      {
        if(userSelected[key]?.length != 0)
        allblank = !allblank;
      }

      if(allblank)dispatch(resetList(lists));
      else dispatch(filterList(allCate));
      
    }

  return (
    <aside className="trs-filter-container">
      <div className="trs-division">
        <h3 className="trs-filter-sub-heading">Color</h3>
        {colors.map((item) => (
          <label key={item.id} className="trs-checkbox-container">
            <input checked={item.checked} onChange={(e) => changeHandler(e, 'color', item.entity)} type="checkbox" />
            <span className="mark">{item.value}</span>
          </label>
        ))}
      </div>
      <div className="trs-division">
      <h3 className="trs-filter-sub-heading">Gender</h3>
        {genders.map((item) => (
          <label key={item.id} className="trs-checkbox-container">
            <input checked={item.checked} onChange={(e) => changeHandler(e, 'gender', item.entity)} type="checkbox" />
            <span className="mark">{item.value}</span>
          </label>
        ))}
      </div>
      <div className="trs-division">
      <h3 className="trs-filter-sub-heading">Price</h3>
        {prices.map((item) => (
          <label key={item.id} className="trs-checkbox-container">
            <input checked={item.checked} onChange={(e) => changeHandler(e, 'price', item.entity)} type="checkbox" />
            <span className="mark">{`Rs ${item.value[0]} - Rs ${item.value[1]}`}</span>
          </label>
        ))}
      </div>
      <div className="trs-division">
      <h3 className="trs-filter-sub-heading">Type</h3>
        {types.map((item) => (
          <label key={item.id} className="trs-checkbox-container">
            <input checked={item.checked} onChange={(e) => changeHandler(e, 'type', item.entity)} type="checkbox" />
            <span className="mark">{item.value}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterCatalogue;

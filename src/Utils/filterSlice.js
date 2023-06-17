import { priceInRange } from "../Helper/helper";

const { createSlice } = require("@reduxjs/toolkit");

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        list: []
    },
    reducers: {
        initilizeList: (state, action) => {
           state.list = action.payload;
        },

        filterList: (state, action) => {
          let totalList = action.payload.list;
          let userSelected = action.payload.userSelected;

          totalList = totalList
          .filter((item) => (userSelected?.color?.includes(item.color?.toLowerCase())) || (userSelected?.type?.includes(item.type?.toLowerCase())) || 
          (userSelected?.gender?.includes(item.gender?.toLowerCase())) || (userSelected?.price?.length > 0 && priceInRange(userSelected?.price, item?.price)) );
          state.list = totalList;
        },

        resetList: (state, action) => {
          state.list = action.payload;
        },

        searchIntoList: (state, action) => {
            let currentList = action.payload.list;
            let text = action.payload.searchedItem;
            if(text?.trim() == ''){
                state.list = currentList;
                return;
            }
            let arr = action.payload.searchedItem.split(' ').map((item) => item.trim()?.toLowerCase());
            currentList = currentList.filter((item) => (text.toLowerCase() == item.name.toLowerCase()) || arr.includes(item.type?.toLowerCase())  || arr.includes(item.color.toLowerCase()));
            state.list = currentList;
        }
    }
})

export const {initilizeList, filterList, resetList, searchIntoList} = filterSlice.actions;
export default filterSlice.reducer;
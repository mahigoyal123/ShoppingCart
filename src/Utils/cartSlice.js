const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: {}
    },
    reducers: {
        addItemToCart: (state, action) => {
           state.items = {...state.items, [action.payload.id] : action.payload};
        },

        addMoreItem: (state, action) => {
            let currObj = state.items[action.payload.id];
           state.items = {...state.items, [action.payload.id]: {...currObj, quantity: ++currObj.quantity}}
        },

        changeQuantity: (state, action) => {
            let currObj = state.items[action.payload.id];
            state.items = {...state.items, [action.payload.id]: {...currObj, quantity: action.payload.quantity}}
        },

        removeItemFromCart: (state, action) => {
            let stateObj= {...state.items};
            delete stateObj[action.payload.id];
            state.items = stateObj;
        },

        removeMoreItem: (state, action) => {
            let stateObj= {...state.items};
            let currObj = state.items[action.payload.id];
          if(currObj.quantity != 0)
          if(currObj.quantity == 1)
          {
            delete stateObj[action.payload.id];
            state.items = stateObj;
          }else{
            state.items = {...state.items, [action.payload.id]: {...currObj, quantity: --currObj.quantity}} ;
          } 
        }
    }
})

export const {addItemToCart, addMoreItem, removeMoreItem, changeQuantity, removeItemFromCart} = cartSlice.actions;
export default cartSlice.reducer;
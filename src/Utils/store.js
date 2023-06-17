import catalogueSlice from "./catalogueSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import appSlice from "./appSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        app: appSlice, 
        catalogue: catalogueSlice,
        cart: cartSlice,
        filter: filterSlice
    }
});

export default store;
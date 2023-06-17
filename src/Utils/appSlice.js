const { createSlice } = require("@reduxjs/toolkit");

const appSlice = createSlice({
    name: "app",
    initialState: {
       filterMenu: false
    },
    reducers: {
        toggleFilterMenu: (state) => {
           state.filterMenu = !state.filterMenu;
        }
    }
})

export const {toggleFilterMenu} = appSlice.actions;
export default appSlice.reducer;
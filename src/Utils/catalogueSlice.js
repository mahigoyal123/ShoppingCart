const { createSlice } = require("@reduxjs/toolkit");

const catalogueSlice = createSlice({
    name: "catalogue",
    initialState: {
        list: []
    },
    reducers: {
        addList: (state, action) => {
           state.list = action.payload;
        }
    }
})

export const {addList} = catalogueSlice.actions;
export default catalogueSlice.reducer;
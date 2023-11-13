import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        search: (state, action) => {
            state.search = action.payload;
        },
    },
});

export default filterSlice.reducer;
export const { search } = filterSlice.actions;

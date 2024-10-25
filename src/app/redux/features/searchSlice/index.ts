import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearch {
    query: string;
}

const initialState: ISearch = { query: "" };

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        search: (state, action: PayloadAction<string>): void => {
            state.query = action?.payload;
        },
        resetQuery: (state) => {
            state.query = "";
        }
    }
});

export const { search, resetQuery } = searchSlice.actions;
export default searchSlice.reducer;
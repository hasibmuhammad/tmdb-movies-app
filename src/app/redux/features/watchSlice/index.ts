import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWatchListItems {
    items: number[]
}

const isBrowser = typeof window !== 'undefined';

const loadFromLocalStorage = () => {
    if (isBrowser) {
        const savedList = localStorage?.getItem("watchList");
        return savedList ? JSON.parse(savedList) : { items: [] };
    }
    return { items: [] };
};

const saveListsToLocalStorage = (state: IWatchListItems): void => {
    if (isBrowser) {
        localStorage.setItem("watchList", JSON.stringify(state));
    }
};

const initialState: IWatchListItems = loadFromLocalStorage();

const watchListSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        addToWatchList: (state, action: PayloadAction<{ id: number }>): void => {
            const exists = state.items.includes(action?.payload?.id);
            if (!exists) {
                state.items.push(action?.payload?.id);
                saveListsToLocalStorage(state);
            }
        },
        removeFromWatchList: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items.filter(item => item !== action?.payload?.id);
            saveListsToLocalStorage(state);
        }
    }
});

export const { addToWatchList, removeFromWatchList } = watchListSlice.actions;
export default watchListSlice.reducer;
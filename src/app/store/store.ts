import searchReducer from "@/app/redux/features/searchSlice/index";
import watchListReducer from "@/app/redux/features/watchSlice/index";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        search: searchReducer,
        watchList: watchListReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
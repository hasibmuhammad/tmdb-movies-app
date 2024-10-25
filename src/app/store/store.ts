import searchReducer from "@/app/redux/features/searchSlice/index";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        search: searchReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
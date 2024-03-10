import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice.ts";
import groupReducer from "./groupSlice.ts";
export const store = configureStore({
    reducer: {
        filter: filterReducer,
        group: groupReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

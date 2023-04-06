import { configureStore } from "@reduxjs/toolkit";
import { dividendsAPI } from "./services/CollectionService";


export const store = configureStore({
    reducer: {
        [dividendsAPI.reducerPath]: dividendsAPI.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(dividendsAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

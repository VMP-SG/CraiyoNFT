import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./wallet";

export const store = configureStore({
    reducer: {
        wallet: walletReducer
    }
});

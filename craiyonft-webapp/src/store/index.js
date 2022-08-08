import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./wallet";
import uiReducer from "./ui";

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    ui: uiReducer
  }
});

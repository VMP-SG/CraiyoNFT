import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wallet: undefined,
    address: ""
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        updateWallet: (state, action) => {
            state.wallet = action.payload;
        },
        updateAddress: (state, action) => {
            state.address = action.payload;
        },
        updateWalletStore: (state, action) => {
            state.wallet = action.payload.wallet;
            state.address = action.payload.address;
        }
    }
});

export const { updateWallet, updateAddress, updateWalletStore } = walletSlice.actions;

export default walletSlice.reducer;

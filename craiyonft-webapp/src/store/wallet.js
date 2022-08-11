import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wallet: undefined,
    address: ""
}

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        updateAddress: (state, action) => {
            state.address = action.payload;
        },
    }
});

export const { updateAddress } = walletSlice.actions;

export default walletSlice.reducer;

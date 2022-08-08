import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMint: false
}

export const uiSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateMint: (state, action) => {
      state.showMint = action.payload;
    }
  }
});

export const { updateMint } = uiSlice.actions;

export default uiSlice.reducer;

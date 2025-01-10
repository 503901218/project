import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    sum: 0,
  },
  reducers: {
    addAction: (state, { payload: data }) => {
      state.sum += data;
    },
    subAction: (state, { payload: data }) => {
      state.sum -= data;
    },
  },
});
export const { addAction, subAction } = counterSlice.actions;
export default counterSlice.reducer;

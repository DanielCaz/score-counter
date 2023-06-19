import { createSlice } from "@reduxjs/toolkit";
import { Counter } from "../interfaces/counter";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    value: [] as Counter[],
  },
  reducers: {
    addCounter: (state, action) => {
      const { id, name, points } = action.payload as Counter;
      state.value.push({ id, name, points });
    },
    removeCounters: (state, action) => {
      state.value = [];
    },
  },
});

export const { addCounter, removeCounters } = historySlice.actions;

export const selectHistory = (state: any) => state.history.value as Counter[];

export default historySlice.reducer;

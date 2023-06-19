import { createSlice } from "@reduxjs/toolkit";
import { HistoryItem } from "../interfaces/historyItem";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    value: [] as HistoryItem[],
  },
  reducers: {
    addCounter: (state, action) => {
      const data = action.payload as HistoryItem;
      state.value.push(data);
    },
    removeCounters: (state) => {
      state.value = [];
    },
  },
});

export const { addCounter, removeCounters } = historySlice.actions;

export const selectHistory = (state: any) =>
  state.history.value as HistoryItem[];

export default historySlice.reducer;

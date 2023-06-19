import { createSlice } from "@reduxjs/toolkit";
import { Counter } from "../../interfaces/counter";

export const countersSlice = createSlice({
  name: "counters",
  initialState: {
    value: [] as Counter[],
  },
  reducers: {
    createNew: (state) => {
      state.value.push({
        id: Date.now(),
        name: `Player ${state.value.length + 1}`,
        points: 0,
      });
    },
    editCounter: (state, action) => {
      const { id, name, points } = action.payload as Counter;
      const index = state.value.findIndex((counter) => counter.id === id);
      state.value[index] = { id, name, points };
    },
    deleteCounter: (state, action) => {
      const { id } = action.payload as Counter;
      state.value = state.value.filter((counter) => counter.id !== id);
    },
    resetAll: (state) => {
      state.value = state.value.map((counter) => ({
        ...counter,
        points: 0,
      }));
    },
    deleteAll: (state) => {
      state.value = [];
    },
  },
});

export const { createNew, editCounter, deleteCounter, resetAll, deleteAll } =
  countersSlice.actions;

export const selectCounters = (state: any) => state.counters.value as Counter[];

export default countersSlice.reducer;

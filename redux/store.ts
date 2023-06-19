import { configureStore } from "@reduxjs/toolkit";
import countersReducer from "./countersSlice";
import historyReducer from "./historySlice";

export default configureStore({
  reducer: {
    counters: countersReducer,
    history: historyReducer,
  },
});

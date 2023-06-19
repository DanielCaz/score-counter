import { configureStore } from "@reduxjs/toolkit";
import countersReducer from "./counters/countersSlice";

export default configureStore({
  reducer: {
    counters: countersReducer,
  },
});

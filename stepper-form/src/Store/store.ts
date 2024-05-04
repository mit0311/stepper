import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./slice/employeeReducer";

const store = configureStore({
  reducer: {
    employeeReducer: employeeSlice.reducer,
  },
});

export default store;

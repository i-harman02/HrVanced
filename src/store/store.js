import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import holidayReducer from "../slices/holidaySlice";
import birthdayReducer from "../slices/birthdaySlice";
import employeeReducer from "../slices/employeeSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    holiday: holidayReducer,
    employee: employeeReducer,
     birthday: birthdayReducer,
    
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import holidayReducer from "../slices/holidaySlice";
import birthdayReducer from "../slices/birthdaySlice";
import employeeReducer from "../slices/employeeSlice.js";
import projectReducer from "../slices/projectSlice.js"
import anniversaryReducer from "../slices/anniversarySlice.js"
import announcementReducer from "../slices/announcementSlice.js"
import dashboardReducer from "../slices/dashboardSlice.js"
import clientReducer from "../slices/clientSlice.js"
import leaveReducer from "../slices/leaveSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    holiday: holidayReducer,
    employee: employeeReducer,
     birthday: birthdayReducer,
     project: projectReducer,
     anniversary: anniversaryReducer,
     announcement: announcementReducer,
     dashboard: dashboardReducer,
     client: clientReducer,
     leave: leaveReducer,
  },
});

export default store;

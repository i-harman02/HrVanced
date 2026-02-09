import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mail: false,
  message: false,
  projects: false,
  team: false,
  finance: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state[action.payload] = true;
    },
    clearNotification: (state, action) => {
      state[action.payload] = false;
    },
    clearAll: () => initialState,                                                   
  },
});

export const {
  setNotification,
  clearNotification,
  clearAll,
} = notificationSlice.actions;

export default notificationSlice.reducer;

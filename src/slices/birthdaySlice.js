import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";


export const fetchBirthdayDetails = createAsyncThunk(
  "birthday/fetchDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/birthday/details", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const birthdaySlice = createSlice({
  name: "birthday",
  initialState: {
    todayBirthdays: [],
    upcomingBirthDays: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBirthdayDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBirthdayDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.todayBirthdays = action.payload.todayBirthdays;
        state.upcomingBirthDays = action.payload.upcomingBirthDays;
      })
      .addCase(fetchBirthdayDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default birthdaySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";


export const fetchWorkAnniversary = createAsyncThunk(
  "/workAnniversary/fetchDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/workAnniversary/details");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const anniversarySlice = createSlice({
  name: "anniversary",
  initialState: {
    todayWorkAnniversary: [],
    upcomingWorkAnniversary: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkAnniversary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkAnniversary.fulfilled, (state, action) => {
        state.loading = false;
        state.todayWorkAnniversary =
          action.payload?.todayWorkAnniversary || [];
        state.upcomingWorkAnniversary =
          action.payload?.upcomingWorkAnniversary || [];
      })
      .addCase(fetchWorkAnniversary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default anniversarySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchShifts = createAsyncThunk(
  "shift/fetchShifts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/shift/all-shifts");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch shifts");
    }
  }
);

export const addShift = createAsyncThunk(
  "shift/addShift",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/shift/add-shift", data);
      return res.data.shift;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add shift");
    }
  }
);

export const updateShift = createAsyncThunk(
  "shift/updateShift",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/shift/update-shift/${id}`, data);
      return res.data.shift;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update shift");
    }
  }
);

export const deleteShift = createAsyncThunk(
  "shift/deleteShift",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/shift/delete-shift/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete shift");
    }
  }
);

const shiftSlice = createSlice({
  name: "shift",
  initialState: {
    shifts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearShiftError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addShift.fulfilled, (state, action) => {
        state.shifts.unshift(action.payload);
      })
      .addCase(updateShift.fulfilled, (state, action) => {
        const index = state.shifts.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.shifts[index] = action.payload;
        }
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.shifts = state.shifts.filter((s) => s._id !== action.payload);
      });
  },
});

export const { clearShiftError } = shiftSlice.actions;
export default shiftSlice.reducer;

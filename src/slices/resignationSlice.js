import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchResignations = createAsyncThunk(
  "resignation/fetchResignations",
  async (userId, { rejectWithValue }) => {
    try {
      const url = userId ? `/resignation/resignation-details/${userId}` : "/resignation/resignation-details";
      const res = await API.get(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addResignation = createAsyncThunk(
  "resignation/addResignation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/resignation/add-resignation", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateResignationStatus = createAsyncThunk(
  "resignation/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await API.put("/resignation/resignation-status-update", { id, status });
      return { id, status };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteResignation = createAsyncThunk(
  "resignation/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/resignation/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const resignationSlice = createSlice({
  name: "resignation",
  initialState: {
    resignations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResignations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResignations.fulfilled, (state, action) => {
        state.loading = false;
        state.resignations = action.payload;
      })
      .addCase(fetchResignations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addResignation.fulfilled, (state, action) => {
        // We might want to refetch or manually add, but usually refetch is safer
      })
      .addCase(updateResignationStatus.fulfilled, (state, action) => {
        const index = state.resignations.findIndex(r => r._id === action.payload.id);
        if (index !== -1) {
          state.resignations[index].status = action.payload.status;
        }
      })
      .addCase(deleteResignation.fulfilled, (state, action) => {
        state.resignations = state.resignations.filter(r => r._id !== action.payload);
      });
  },
});

export default resignationSlice.reducer;

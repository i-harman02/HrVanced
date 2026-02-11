import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchPerformances = createAsyncThunk(
  "performance/fetchPerformances",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/performance/all-performance");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPerformance = createAsyncThunk(
  "performance/addPerformance",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await API.post("/performance/add-performance", data);
      dispatch(fetchPerformances());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePerformance = createAsyncThunk(
  "performance/updatePerformance",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await API.put("/performance/update-performance", data);
      dispatch(fetchPerformances());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePerformance = createAsyncThunk(
  "performance/deletePerformance",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await API.delete(`/performance/delete/${id}`);
      dispatch(fetchPerformances());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const performanceSlice = createSlice({
  name: "performance",
  initialState: {
    performances: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformances.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPerformances.fulfilled, (state, action) => {
        state.loading = false;
        state.performances = action.payload;
      })
      .addCase(fetchPerformances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPerformance.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPerformance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default performanceSlice.reducer;

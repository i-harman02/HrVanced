import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchDesignations = createAsyncThunk(
  "designation/fetchDesignations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/designation/list");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createDesignation = createAsyncThunk(
  "designation/createDesignation",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await API.post("/designation/add", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);export const updateDesignation = createAsyncThunk(
  "designation/updateDesignation",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/designation/update/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  "designation/deleteDesignation",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/designation/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const designationSlice = createSlice({
  name: "designation",
  initialState: {
    designations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = action.payload;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.designations.push(action.payload);
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        const index = state.designations.findIndex(d => d._id === action.payload._id);
        if (index !== -1) {
          state.designations[index] = action.payload;
        }
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.designations = state.designations.filter(d => d._id !== action.payload);
      });
  },
});

export default designationSlice.reducer;

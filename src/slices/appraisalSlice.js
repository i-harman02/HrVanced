import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchAppraisals = createAsyncThunk(
  "appraisal/fetchAppraisals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appraisalDate/all");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch appraisals");
    }
  }
);

export const addAppraisal = createAsyncThunk(
  "appraisal/addAppraisal",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/appraisalDate/add", data);
      return res.data.appraisal;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add appraisal");
    }
  }
);

export const updateAppraisal = createAsyncThunk(
  "appraisal/updateAppraisal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/appraisalDate/update/${id}`, data);
      return res.data.appraisal;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update appraisal");
    }
  }
);

export const deleteAppraisal = createAsyncThunk(
  "appraisal/deleteAppraisal",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/appraisalDate/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete appraisal");
    }
  }
);

const appraisalSlice = createSlice({
  name: "appraisal",
  initialState: {
    appraisals: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAppraisalError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppraisals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppraisals.fulfilled, (state, action) => {
        state.loading = false;
        state.appraisals = action.payload;
      })
      .addCase(fetchAppraisals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAppraisal.fulfilled, (state, action) => {
        state.appraisals.unshift(action.payload);
      })
      .addCase(updateAppraisal.fulfilled, (state, action) => {
        const index = state.appraisals.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.appraisals[index] = action.payload;
        }
      })
      .addCase(deleteAppraisal.fulfilled, (state, action) => {
        state.appraisals = state.appraisals.filter((a) => a._id !== action.payload);
      });
  },
});

export const { clearAppraisalError } = appraisalSlice.actions;
export default appraisalSlice.reducer;

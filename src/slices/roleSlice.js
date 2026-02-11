import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/role/list");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createRole = createAsyncThunk(
  "role/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/role/add", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/role/update/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/role/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(r => r._id !== action.payload);
      });
  },
});

export default roleSlice.reducer;

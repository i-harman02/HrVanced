import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/client/detail");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createClient = createAsyncThunk(
  "client/createClient",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/client/add-client", data);
      return res.data.client;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.put("/client/detail-update", data);
      return data; // res.data.client might be different or not returned sometimes
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/client/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearClientState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
        state.success = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex((c) => c._id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = { ...state.clients[index], ...action.payload };
        }
        state.success = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearClientState } = clientSlice.actions;
export default clientSlice.reducer;

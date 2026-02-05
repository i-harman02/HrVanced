import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyLeaveApi,
  getMyLeavesApi,
  getLeaveHistoryApi,
  getLeaveStatsApi,
  getLeaveBalanceApi,
} from "../api/leave.api";

/* ================= APPLY LEAVE ================= */
export const applyLeave = createAsyncThunk(
  "leave/apply",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await applyLeaveApi(payload);
      return res.data.leave;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= TABLE ================= */
export const fetchMyLeaves = createAsyncThunk(
  "leave/fetchMyLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyLeavesApi();
      return res.data.leaveData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* ================= HISTORY ================= */
export const fetchLeaveHistory = createAsyncThunk(
  "leave/fetchLeaveHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLeaveHistoryApi();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load leave history");
    }
  }
);

/* ================= STATS ================= */
export const fetchLeaveStats = createAsyncThunk(
  "leave/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLeaveStatsApi();
      return res.data; // array of 12 months
    } catch (err) {
      return rejectWithValue("Failed to load leave stats");
    }
  }
);

/* ================= BALANCE ================= */
export const fetchLeaveBalance = createAsyncThunk(
  "leave/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLeaveBalanceApi();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load leave balance");
    }
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    list: [],
    history: [],
    stats: [],
    balance: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ================= TABLE ================= */
      .addCase(fetchMyLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= HISTORY ================= */
      .addCase(fetchLeaveHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })

      /* ================= STATS ================= */
      .addCase(fetchLeaveStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaveStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;   // ✅ FIX 2: STORE STATS
      })
      .addCase(fetchLeaveStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= BALANCE ================= */
      .addCase(fetchLeaveBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })

      /* ================= APPLY LEAVE ================= */
      .addCase(applyLeave.fulfilled, (state, action) => {
        state.list.unshift(action.payload);      // table
        state.history.unshift(action.payload);   // history
        // stats will auto-update after refetch
      });
  },
});

export default leaveSlice.reducer;

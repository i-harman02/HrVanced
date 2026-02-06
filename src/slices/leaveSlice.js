import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyLeaveApi,
  getMyLeavesApi,
  getLeaveHistoryApi,
  getLeaveStatsApi,
  getLeaveBalanceApi,
  getRequestedLeavesApi,
  updateLeaveStatusApi,
  getTodayLeavesApi,
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

/* ================= REQUESTED LEAVES ================= */
export const fetchRequestedLeaves = createAsyncThunk(
  "leave/fetchRequested",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const res = await getRequestedLeavesApi(id, params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load requested leaves");
    }
  }
);

/* ================= UPDATE LEAVE STATUS ================= */
export const updateLeaveStatus = createAsyncThunk(
  "leave/updateStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateLeaveStatusApi(payload);
      return res.data.leave;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update leave status");
    }
  }
);

/* ================= TODAY LEAVES ================= */
export const fetchTodayLeaves = createAsyncThunk(
  "leave/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTodayLeavesApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load today's leaves");
    }
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    list: [],
    requestedLeaves: [],
    history: [],
    stats: [],
    balance: null,
    todayLeaves: [],
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
      })
      /* ================= REQUESTED LEAVES ================= */
      .addCase(fetchRequestedLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestedLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.requestedLeaves = action.payload.leaveData;
      })
      .addCase(fetchRequestedLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ================= UPDATE LEAVE STATUS ================= */
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const index = state.requestedLeaves.findIndex(l => l._id === action.payload._id);
        if (index !== -1) {
          state.requestedLeaves[index] = action.payload;
        }
      })
      /* ================= TODAY LEAVES ================= */
      .addCase(fetchTodayLeaves.fulfilled, (state, action) => {
        state.todayLeaves = action.payload;
      });
  },
});

export default leaveSlice.reducer;

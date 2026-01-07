import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";




export const fetchHolidays = createAsyncThunk(
  "holiday/fetchHolidays",
  async (year, { rejectWithValue }) => {
    try {
      const res = await API.get(`/holiday/get-list/${year}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createHoliday = createAsyncThunk(
  "holiday/createHoliday",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/list", data);
      return res.data.holiday;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateHoliday = createAsyncThunk(
  "holiday/updateHoliday",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await API.put(`/${id}`, data);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const deleteHoliday = createAsyncThunk(
  "holiday/deleteHoliday",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const holidaySlice = createSlice({
  name: "holiday",
  initialState: {
    holidays: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchHolidays.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createHoliday.fulfilled, (state, action) => {
        state.holidays.push(action.payload);
      })

      // update
      .addCase(updateHoliday.fulfilled, (state, action) => {
        const index = state.holidays.findIndex(
          (h) => h._id === action.payload.id
        );
        if (index !== -1) {
          state.holidays[index] = {
            ...state.holidays[index],
            ...action.payload.data,
          };
        }
      })

      // delete
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.holidays = state.holidays.filter(
          (h) => h._id !== action.payload
        );
      });
  },
});

export default holidaySlice.reducer;

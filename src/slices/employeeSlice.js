import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/employee/list");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/employee/create", data);
      return res.data.employee;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await API.put(`/employee/${id}`, data);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/employee/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // update
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (e) => e._id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = {
            ...state.employees[index],
            ...action.payload.data,
          };
        }
      })

      // delete
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (e) => e._id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;

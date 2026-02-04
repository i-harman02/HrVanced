import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";




export const addProject = createAsyncThunk(
  "project/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/project/add-details", data);
      return res.data.Project;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const fetchAllProjects = createAsyncThunk(
  "project/fetchAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/project/all-project");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to fetch projects"
      );
    }
  }
);

// Get assigned projects (user)
export const fetchAssignedProjects = createAsyncThunk(
  "project/assigned",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/project/assigned-project/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


export const fetchClientProjects = createAsyncThunk(
  "project/client",
  async (clientId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/project/client-project/${clientId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


export const updateProject = createAsyncThunk(
  "project/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.put("/project/update-project", data);
      return res.data.Project;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/project/delete-project/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* =======================
   SLICE
======================= */

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    assignedProjects: [],
    clientProjects: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProjectState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ADD PROJECT */
      .addCase(addProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects.unshift(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ALL PROJECTS */
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ASSIGNED PROJECTS */
      .addCase(fetchAssignedProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedProjects = action.payload;
      })
      .addCase(fetchAssignedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CLIENT PROJECTS */
      .addCase(fetchClientProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProjects = action.payload;
      })
      .addCase(fetchClientProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE PROJECT */
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects = state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE PROJECT */
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearProjectState } = projectSlice.actions;
export default projectSlice.reducer;

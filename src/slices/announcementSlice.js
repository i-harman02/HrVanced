import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Fetch all posts by type
// postType: 1-Announcement, 2-Birthday, 3-Anniversary
export const fetchPosts = createAsyncThunk(
  "announcement/fetchPosts",
  async (postType, { rejectWithValue }) => {
    try {
      const res = await API.get(`/announcement/list/${postType}`);
      return { postType, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  "announcement/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await API.post("/announcement/add", postData);
      return res.data.announcement;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Add a comment to a post
export const addComment = createAsyncThunk(
  "announcement/addComment",
  async ({ postId, text, userId }, { rejectWithValue }) => {
    try {
      const res = await API.post("/comment/post", { id: postId, text, employee: userId });
      return { postId, comment: res.data.newComment };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Toggle like on a post
export const toggleLike = createAsyncThunk(
  "announcement/toggleLike",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const res = await API.post("/comment/like-post", { id: postId, employee: userId });
      return { postId, userId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "announcement/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await API.delete(`/announcement/delete/${postId}`);
      return postId;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    announcements: [],
    birthdayPosts: [],
    anniversaryPosts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { postType, data } = action.payload;
        if (postType === 1) state.announcements = data;
        else if (postType === 2) state.birthdayPosts = data;
        else if (postType === 3) state.anniversaryPosts = data;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        const post = action.payload;
        if (post.postType === 1) state.announcements.unshift(post);
        else if (post.postType === 2) state.birthdayPosts.unshift(post);
        else if (post.postType === 3) state.anniversaryPosts.unshift(post);
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const updateInList = (list) => {
          const post = list.find(p => p._id === postId);
          if (post) {
            post.comment = [...(post.comment || []), comment];
          }
        };
        updateInList(state.announcements);
        updateInList(state.birthdayPosts);
        updateInList(state.anniversaryPosts);
      })
      // Toggle Like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, userId, message } = action.payload;
        const updateInList = (list) => {
          const post = list.find(p => p._id === postId);
          if (post) {
            if (message === "Like added") {
              post.likes = [...(post.likes || []), { employee: userId }];
            } else {
              post.likes = (post.likes || []).filter(l => l.employee !== userId && l.employee?._id !== userId);
            }
          }
        };
        updateInList(state.announcements);
        updateInList(state.birthdayPosts);
        updateInList(state.anniversaryPosts);
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.announcements = state.announcements.filter(p => p._id !== postId);
        state.birthdayPosts = state.birthdayPosts.filter(p => p._id !== postId);
        state.anniversaryPosts = state.anniversaryPosts.filter(p => p._id !== postId);
      });
  },
});

export default announcementSlice.reducer;

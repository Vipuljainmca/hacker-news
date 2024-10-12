import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (username) => {
    const response = await fetch(`http://hn.algolia.com/api/v1/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') || '',
    userData: null,
  },
  reducers: {
    login(state, action) {
      state.username = action.payload.username;
      localStorage.setItem('username', action.payload.username);
    },
    logout(state) {
      state.username = '';
      state.userData = null;
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});


export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

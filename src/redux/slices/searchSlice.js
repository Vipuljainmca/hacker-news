import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query) => {
    const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
    const data = await response.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    page: 0, // Add a page state to manage pagination
  },
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
      state.page = 0; // Reset to the first page when a new query is set
    },
    setPage(state, action) { // Define setPage reducer
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload.hits; // Assuming the API returns hits array
        state.query = action.meta.arg; // Set the query from the argument
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { setSearchQuery, setPage } = searchSlice.actions; // Export setPage action

// Export selector to access the search state
export const selectSearch = (state) => state.search;

// Export the reducer
export default searchSlice.reducer;

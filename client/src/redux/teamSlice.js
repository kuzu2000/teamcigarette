import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from './requestMethod';

export const fetchTeams = createAsyncThunk('fetchTeams', async () => {
  const res = await publicRequest.get('/teams');
  return res.data;
});

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teams: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    loading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    error: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    getTeam: (state, action) => {
      state.teams = action.payload
      state.isFetching = false;
    }
  },
  extraReducers: {
    [fetchTeams.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    [fetchTeams.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.teams = action.payload
    },
    [fetchTeams.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const {
  loading,
  error,
  getTeam
} = teamSlice.actions;
export default teamSlice.reducer;

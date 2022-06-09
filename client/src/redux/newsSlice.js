import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest } from './requestMethod';

export const fetchNews = createAsyncThunk('fetchNews', async () => {
  const res = await publicRequest.get('/news');
  return res.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    isFetching: null,
    isError: false,
  },
  reducers: {
    Loading: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    Error: (state) => {
      state.isError = true;
      state.isFetching = false;
    },
    addNews: (state, action) => {
      state.news.push(action.payload);
      state.isFetching = false;
    },
    getNew: (state, action) => {
      state.news = action.payload
      state.isFetching = false;
    }
  },
  extraReducers: {
    [fetchNews.pending]: (state) => {
        state.isFetching = true;
        state.isError = false;
      },
      [fetchNews.fulfilled]: (state, action) => {
        state.isFetching = false;
        state.news = action.payload
      },
      [fetchNews.rejected]: (state) => {
        state.isFetching = false;
        state.isError = true;
      },
  },
});

export const {Loading, Error, addNews, getNew } = newsSlice.actions
export default newsSlice.reducer
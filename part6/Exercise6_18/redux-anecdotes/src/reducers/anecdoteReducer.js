/* eslint-disable no-case-declarations */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotesService';

const initialState = [];

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      votes: 0,
      id: generateId()
    }
  }
}

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/fetchAll',
  async () => {
    const anecdotes = await anecdotesService.getAll();
    return anecdotes;
  }
);

export const createNote = createAsyncThunk(
  'anecdotes/create',
  async (content) => {
    const newAnecdote = await anecdotesService.createNew(content);
    return newAnecdote;
  }
);

export const voteAnecdoteBack = createAsyncThunk(
  'anecdotes/vote',
  async (id) => {
    const anecdoteToVote = await anecdotesService.get(id);
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
    const response = await anecdotesService.update(id, updatedAnecdote);
    return response;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(voteAnecdoteBack.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload;
        const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id);
        if (index !== -1) {
          state[index] = updatedAnecdote;
        }
      });
  },
});

export default anecdoteSlice.reducer;

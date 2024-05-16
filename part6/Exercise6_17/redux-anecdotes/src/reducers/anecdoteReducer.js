/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotesService';


const initialState = [] //anecdotesAtStart.map(asObject)
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

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload.id;
      const anecdote = state.find(anecdote => anecdote.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
      state.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
});

export const { vote, addAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer;

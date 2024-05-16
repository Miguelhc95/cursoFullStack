/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit';


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
    createNote(state, action) {
      state.push(action.payload)
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
export default anecdoteSlice.reducer;
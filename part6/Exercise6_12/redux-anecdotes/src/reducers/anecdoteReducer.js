/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit';


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
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
    addAnecdote: (state, action) => {
      const newAnecdote = {
        content: action.payload.content,
        id: generateId(),
        votes: 0
      };
      state.push(newAnecdote);
      state.sort((a, b) => b.votes - a.votes);
    }
  }
});

export const { vote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
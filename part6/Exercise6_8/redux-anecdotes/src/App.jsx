/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import { createAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const store = configureStore({ reducer });


  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App
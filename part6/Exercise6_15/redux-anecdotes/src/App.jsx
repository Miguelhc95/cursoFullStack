/* eslint-disable no-unused-vars */
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import { useEffect } from 'react'
import anecdotesService from './services/anecdotesService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll().then(notes => dispatch(setAnecdotes(notes)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App
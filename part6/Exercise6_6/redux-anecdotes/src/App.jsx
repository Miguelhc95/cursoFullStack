/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from  './reducers/anecdoteReducer'
import { createAnecdote } from './reducers/anecdoteReducer'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', data: { id } });
  }

  const store = configureStore({ reducer });

  

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value;
    event.target.anecdote.value = ''
    store.dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /> 
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default App
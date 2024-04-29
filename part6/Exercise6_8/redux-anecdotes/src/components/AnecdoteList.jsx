import { useDispatch, useSelector } from 'react-redux'


const Anecdotes = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch({ type: 'VOTE', data: { id } });
  }

  return(
    <ul>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                 {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
    </ul>
  )
}

export default Anecdotes
import { useDispatch, useSelector } from 'react-redux';
import Filter from './visibilityFilter'

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes); 
    const filter = useSelector(state => state.filter)

    const vote = (id) => {
        dispatch({ type: 'VOTE', data: { id } });
    }

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <Filter /> 
            <ul>
                {filteredAnecdotes.map(anecdote =>
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
        </div>
    )
}

export default Anecdotes;

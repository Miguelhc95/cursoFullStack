import { useDispatch, useSelector } from 'react-redux';
import Filter from './visibilityFilter'
import { vote } from '../reducers/anecdoteReducer';

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes); 
    const filter = useSelector(state => state.filter)


    const voteAnecdote = (id) => {
        dispatch(vote({ id }));
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
                            {anecdote.votes} <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default Anecdotes;

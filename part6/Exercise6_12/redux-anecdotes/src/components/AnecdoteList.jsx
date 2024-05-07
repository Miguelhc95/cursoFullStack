import { useDispatch, useSelector } from 'react-redux';
import Filter from './visibilityFilter'
import Notification from './Notification'
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes); 
    const filter = useSelector(state => state.filter)

    const handleShowNotification = () => {
        dispatch(setNotification('Este es un mensaje de notificación.'));
      };

    const voteAnecdote = (id) => {
        handleShowNotification()
        dispatch(vote({ id }));
    }

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );


    return (
        <div>
            <Notification/>
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

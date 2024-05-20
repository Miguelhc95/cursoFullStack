import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './visibilityFilter';
import Notification from './Notification';
import { voteAnecdoteBack, initializeAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification, displayNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter) || '';

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    const handleShowNotificationVote = (message) => {
        dispatch(displayNotification(`You voted: ${message}`, 5)); // Aquí utilizamos el nuevo action creator
    };

    const handleVote = (id, content) => {
        handleShowNotificationVote(content);
        dispatch(voteAnecdoteBack(id));
    };

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <Notification />
            <Filter />
            <ul>
                {filteredAnecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            {anecdote.votes} <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default Anecdotes;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state);
    const [filter, setFilter] = useState('');

    const vote = (id) => {
        dispatch({ type: 'VOTE', data: { id } });
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const filteredAnecdotes = anecdotes.filter(anecdote => {
        return filter === '' || anecdote.content.toLowerCase().includes(filter.toLowerCase())
    });

    return (
        <div>
            <div>
                Filter: <input value={filter} onChange={handleFilterChange} />
            </div>
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

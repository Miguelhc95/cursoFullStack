import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

const NewAnecdote = () => {

    const dispatch = useDispatch()

    const handleShowNotificationAdd = (message) => {
        dispatch(setNotification(`You added: ${message}`));
        setTimeout(() => {
            dispatch(setNotification(''));
          }, 5000);
    };

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        handleShowNotificationAdd(content)
        dispatch(createAnecdote(content))
    }


    return (
        <form onSubmit={addAnecdote}>
            <div>
                <input name="anecdote" />
                <button type="submit">create</button>
            </div>
        </form>
    )
}

export default NewAnecdote
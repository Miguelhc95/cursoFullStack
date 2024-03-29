import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
  
    const personObject = {
      id: persons.length + 1,
      name: newName
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        name:
        <input value={newName} onChange={handlePersonChange}/>
        <button type="submit">add</button>
      </form>   
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
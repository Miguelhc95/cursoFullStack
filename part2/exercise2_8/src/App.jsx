import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    const existingPhone = persons.find(person => person.phone === newPhone)

    if(existingPerson){
      alert(`${newName} is already added to phonebook`)

    }else if(existingPhone){
      alert(`${newPhone} is already added to phonebook`)
    }
    else{
      const personObject = {
        id: persons.length + 1,
        name: newName,
        phone: newPhone
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }
  

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        name:
        <input value={newName} onChange={handlePersonChange}/>
        phone:
        <input value={newPhone} onChange={handlePhoneChange}/>
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
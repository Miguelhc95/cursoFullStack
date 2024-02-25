import { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
    const existingPhone = persons.find(person => person.number === newPhone);

    if(existingPerson) {
      alert(`${newName} is already added to the phonebook`);
    } else if(existingPhone) {
      alert(`${newPhone} is already added to the phonebook`);
    } else {
      const personObject = {
        id: persons.length+1,
        name: newName,
        number: newPhone
      };
    
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewPhone('');
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personsToShow = searchTerm === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with:
        <input value={searchTerm} onChange={handleSearchChange}/>
      </form>   
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        name:
        <input value={newName} onChange={handlePersonChange}/>
        phone:
        <input value={newPhone} onChange={handlePhoneChange}/>
        <button type="submit">add</button>
      </form>   
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  );
};

export default App;

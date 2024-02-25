import { useState } from 'react';
import Person from './components/Person';

const PersonForm = (props) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = props.persons.find(person => person.name === newName);
    const existingPhone = props.persons.find(person => person.phone === newPhone);

    if(existingPerson) {
      alert(`${newName} is already added to the phonebook`);
    } else if(existingPhone) {
      alert(`${newPhone} is already added to the phonebook`);
    } else {
      const personObject = {
        id: props.persons.length + 1,
        name: newName,
        phone: newPhone
      };
    
      props.setPersons(props.persons.concat(personObject));
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

  return(
    <form onSubmit={addPerson}>
        name:
        <input value={newName} onChange={handlePersonChange}/>
        phone:
        <input value={newPhone} onChange={handlePhoneChange}/>
        <button type="submit">add</button>
      </form>  
  )
}


const Filter = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personsToShow = searchTerm === '' 
    ? props.persons 
    : props.persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return(
    <div>
      <form>
        filter shown with:
        <input value={searchTerm} onChange={handleSearchChange}/>
      </form>   
      <h2>Numbers</h2>
      <ul>
        <Persons persons={personsToShow} />
      </ul>
    </div>
  )
}


const Persons = (props) => {

  return(
    <ul>
        {props.persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
import Person from './components/Person';
import personService from './services/persons'

const PersonForm = (props) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = props.persons.find(person => person.name === newName);
    const existingPhone = props.persons.find(person => person.number === newPhone);
    const personObject = {
      name: newName,
      number: newPhone,
      id: (props.persons.length + 1).toString()
    };

    if (existingPerson) {
      if (window.confirm("Are you sure you want to edit the number of this person?")) {
        const updatedPersonObject = { ...existingPerson, number: newPhone }; 
        personService.update(existingPerson.id, updatedPersonObject)
          .then(response => {
            console.log("Person updated successfully");
            props.updatePerson(updatedPersonObject);
          })
          .catch(error => {
            console.error("Error updating person:", error);
          });
      }
    
    } else if(existingPhone) {
        alert(`${newPhone} is already added to the phonebook`);
        
    } else {
    
      props.setPersons(props.persons.concat(personObject));
  
      personService
      .create(personObject)
      .then(response => {
        props.setPersons(props.persons.concat(response.data));
        setNewName('');
        setNewPhone(''); 
    })
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
        <Persons persons={personsToShow} deletePerson={props.deletePerson} />
      </ul>
    </div>
  )
}


const Persons = (props) => {

  if (!props.persons) {
    return null
  }

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService.delete(id)
        .then(response => {
          console.log("Person deleted successfully");
          props.deletePerson(id);
        })
        .catch(error => {
          console.error("Error deleting person:", error);
        });
    }
  }
  
  return(
    <ul>
        {props.persons.map(person => 
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
        )}
      </ul>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const deletePerson = (id) => {
    const updatedPersons = persons.filter(person => person.id !== id);
    setPersons(updatedPersons);
  };

  const updatePerson = (updatedPerson) => {
    const updatedPersons = persons.map(person => 
      person.id === updatedPerson.id ? updatedPerson : person
    );
    setPersons(updatedPersons);
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} deletePerson={deletePerson}/>
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} updatePerson={updatePerson}/>
    </div>
  );
};

export default App;
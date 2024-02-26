import { useState, useEffect } from 'react';
import Person from './components/Person';
import personService from './services/persons'

const PersonForm = (props) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [messageError, setMessageError] = useState(null)
  const [messageCorrect, setMessageCorrect] = useState(null)


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
            setMessageCorrect(`Person updated from the phonebook`)
            setTimeout(() => {
              setMessageCorrect(null)
            }, 5000)
            props.updatePerson(updatedPersonObject);
          })
          .catch(error => {
            setMessageError(`${error} Error...`)
            setTimeout(() => {
              setMessageError(null)
            }, 5000)
          });
      }
    
    } else if(existingPhone) {
        setMessageError(`${newPhone} is already added to the phonebook`)
        setTimeout(() => {
          setMessageError(null)
        }, 5000)
  
        
    } else {
    
      props.setPersons(props.persons.concat(personObject));
  
      personService
      .create(personObject)
      .then(response => {
        props.setPersons(props.persons.concat(response.data));
        setNewName('');
        setNewPhone(''); 

        setMessageCorrect(`Person added to the phonebook`)
        setTimeout(() => {
          setMessageCorrect(null)
        }, 5000)
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
        <NotificationError message={messageError} />
        <NotificationCorrect message={messageCorrect} />
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
          console.error(
            `The person was already deleted from server`
          )
          })
    }
  }
  
  return(
    <ul className='person'>
        {props.persons.map(person => 
          <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
        )}
    </ul>
  )
} 

const NotificationError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
};

const NotificationCorrect = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="correct">
      {message}
    </div>
  );
};


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
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
      <Footer />
    </div>
  );
};

export default App;
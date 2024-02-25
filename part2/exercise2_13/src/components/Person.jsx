const Person = ({ person, deletePerson }) => {
    return (
      <li>{person.name} {person.phone}</li>
    )
  }
  
  export default Person
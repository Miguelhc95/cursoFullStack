const Course = ({ course }) => {
    return (
      <>
        <h1>{course.name}</h1>
        <ul>{course.parts.map(part =>(
          <li key={part.id}>{part.name}</li>))}
          </ul>
      </>
    )
  }
  
  export default Course
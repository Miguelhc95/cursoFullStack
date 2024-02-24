const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
      return (
        <>
          <h1>{course.name}</h1>
          <ul>{course.parts.map(part =>(
            <li key={part.id}>{part.name} {part.exercises}</li>))}
          </ul>
          
          <p><strong>Total exercises: {totalExercises}</strong></p>
        </>
      )
    }
    
    export default Course

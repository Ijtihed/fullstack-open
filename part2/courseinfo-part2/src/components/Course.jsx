const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ))}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of {total} exercises</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course 
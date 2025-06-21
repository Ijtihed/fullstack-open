import { useState } from 'react'

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

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App

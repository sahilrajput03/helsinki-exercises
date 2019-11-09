import React from 'react'

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Content = ({ content }) => {
  const newContent = content.map((prt, idx, arr) => (<Part key={prt.id} part={prt.name} exercise={prt.exercises}></Part>))
  return (
    <div>
      {newContent}
    </div>
  )
}

const Part = props => (
  <div>
    <p>
      {props.part} {props.exercise}
    </p>
  </div>
)

const Total = (props) => {
  const parts = props.parts.map((t) => (t.exercises))
  return (
    <div><b>Total Exercises:  {parts.reduce((total, num) => {
      return total + num;
    })}
    </b></div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content content={course.parts} ></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}
export default Course
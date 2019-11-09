//and remove extra files (App.js, App.css, App.test.js, logo.svg, serviceWorker.j
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <p>{props.course}</p>
  </div>
)

const Content = props => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}></Part>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}></Part>
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

const Total = (props) =>{
  const parts = props.parts.map((t)=>(t.exercises))
  // const koo = poo.exercises
  
  return (
    <div>Total Exercises:  {parts.reduce((total, num) => {
      return total + num;
    })}</div>
  )
} 

const App = () => {
  
  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }
  // const parts = [part1, part2, part3]

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }  

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts} ></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0])
  const rom = () => {
    var x = Math.floor((Math.random() * anecdotes.length));
    setSelected(x)
  }
  const votingMachine = (p) => {
    // let temp = vote[p]
    let arr = [...vote]
    arr[p] = arr[p] + 1
    console.log(arr[p]);
    setVote(arr)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={() => votingMachine(selected)}>vote</button>
      <button onClick={rom}>next anecdote </button>
      <h1>Anecdote with most votes</h1>
      <p>{(

        () => {
          let maxValue = Math.max(...vote)
          let maxValueIndex = vote.findIndex((j)=>(j===maxValue));
          // let maxVoted = maxValue.find((k) => (k === maxValue))
          return (
            <p>{anecdotes[maxValueIndex]}</p>
          )
        }

      )()}</p>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
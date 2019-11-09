import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = props => {
  return (
    <div>
      <tr>
        <td style={{ width: "90px" }}>{props.text}</td>
        <td style={{ width: "90px" }}>{props.value}</td>
      </tr>
    </div>
  )
}

const Stastistics = (props) => {
  const no_stats_flag = 0

  if (no_stats_flag === (props.good + props.bad + props.neutral)) {
    return (
      <div>
        <h2>Stastistics</h2>
        <p>No feedback given</p>
      </div>

    )
  } else {
    return (
      <div>
        <h2>Stastistics</h2>

        <Statistic text="good" value={props.good}></Statistic>
        <Statistic text="neutral" value={props.neutral}></Statistic>
        <Statistic text="bad" value={props.bad}></Statistic>
        <Statistic text="total" value={props.good + props.neutral + props.bad}></Statistic>
        <Statistic text="average" value={
          (() => {

            let p = (props.good - props.bad) / (props.good + props.neutral + props.bad)
            p = p.toFixed(2);
            return p
          })()

        }></Statistic>
        <Statistic text="positive" value={(() => {
          let p = (props.good / (props.good + props.neutral + props.bad) * 100)
          p = p.toFixed(2);
          return (p + " %")
        })()

        }></Statistic>
      </div>
    )
  }
}

const Button = (props) => {
  if (props.value === "good") {
    return (
      <button onClick={() => {
        props.customevent(props.customevent(props.value) + 1)
      }}>GOOD</button>
    )
  } else if (props.value === "neutral") {
    return (
      <button onClick={() => {
        props.customevent(props.customevent(props.value) + 1)
      }}>NEUTRAL</button>
    )
  } else if (props.value === "bad") {
    return (
      <button onClick={() => {
        props.customevent(props.customevent(props.value) + 1)
      }}>BAD</button>
    )
  }
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const eventHandler = (param) => {
    if (param === "good") {
      setGood(good + 1)
    } else if (param === "bad") {
      setBad(bad + 1)
    } else if (param === "neutral") {
      setNeutral(neutral + 1)
    }
  }

  return (
    <div>
      <Button value="good" customevent={eventHandler}>Good</Button>
      <Button value="neutral" customevent={eventHandler}>Neutral</Button>
      <Button value="bad" customevent={eventHandler}>Bad</Button>
      <br></br>
      <Stastistics good={good} neutral={neutral} bad={bad} ></Stastistics>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
import { useState } from 'react'

const DisplayTittle = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const title = "Give Feedback"
  const subtitle = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <DisplayTittle title={title} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <DisplayTittle title={subtitle} />
      <Display counter={"good: " + good} />
      <Display counter={"neutral: " + neutral}/>
      <Display counter={"bad: " + bad}/>
    </div>
  )
}

export default App
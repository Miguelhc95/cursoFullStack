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

  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad;
    const updatedAverage = (updatedGood * 1 + neutral * 0 + bad * -1) / updatedTotal;
    const updatedPositive = (updatedGood * 100) / updatedTotal;
    setGood(updatedGood);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  };
  
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = good + updatedNeutral + bad;
    const updatedAverage = (good * 1 + updatedNeutral * 0 + bad * -1) / updatedTotal;
    const updatedPositive = (good * 100) / updatedTotal;
    setNeutral(updatedNeutral);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  };
  
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    const updatedTotal = good + neutral + updatedBad;
    const updatedAverage = (good * 1 + neutral * 0 + updatedBad * -1) / updatedTotal;
    const updatedPositive = (good * 100) / updatedTotal;
    setBad(updatedBad);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
  };
  

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
      <Display counter={"TOTAL: " + total}/>
      <Display counter={"Average: " + average}/>
      <Display counter={"% Positive: " + positive}/>
    </div>
  )
}

export default App
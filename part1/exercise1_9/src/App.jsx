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

const Statistics = (props) => {
  return (
    <>
      <div>{"good: " +props.good}</div>
      <div>{"neutral: " +props.neutral}</div>
      <div>{"bad: " +props.bad}</div>
      <div>{"TOTAL: " +props.total}</div>
      <div>{"Average: " +props.average}</div>
      <div>{"% Positive: " +props.positive}</div>
    </>
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
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad} total={props.total} average={props.average} positive={props.positive} />
    </div>
  )
}

const App = () => {
  const title = "Give Feedback";
  const subtitle = "statistics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad;
    const updatedAverage = (updatedGood * 1 + neutral * 0 + bad * -1) / updatedTotal;
    const updatedPositive = (updatedGood * 100) / updatedTotal;
    setGood(updatedGood);
    setTotal(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive);
    setAll(allClicks.concat('g'))
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
    setAll(allClicks.concat('n'))
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
    setAll(allClicks.concat('b'))
  };
  

  return (
    <div>
      <DisplayTittle title={title} />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <DisplayTittle title={subtitle} />
      <History allClicks={allClicks}  good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}


export default App
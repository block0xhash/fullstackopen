import { useState } from 'react'

const Button = ({ onSmash, text }) => {

  return (
    <button onClick={onSmash} >
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  const { good, neutral, bad, all } = stats;

  if (all === 0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  } else {

    const total_score = (good * 1) + (neutral * 0) + (bad * -1);
    const average = total_score / all;
    const positive = (good / all) * 100;

    return (
      <div>

        <h2>statistics</h2>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={average.toFixed(1)} />
          <StatisticLine text="positive" value={positive.toFixed(1) + "%"} />
        </table>
      </div>

    )
  }
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseGoodbyOne = () => {
    setGood(good + 1)
    setAll(all + 1)

  }

  const increaseNeutralbyOne = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const increaseBadbyOne = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button onSmash={increaseGoodbyOne} text="good" />
      <Button onSmash={increaseNeutralbyOne} text="neutral" />
      <Button onSmash={increaseBadbyOne} text="bad" />
      <Statistics stats={{ good, neutral, bad, all }} />
    </>
  )
}

export default App
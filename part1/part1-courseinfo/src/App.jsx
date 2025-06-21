import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>

      <h2>statistics</h2>
      <p>good {good}</p>
    </div>
  )
}

export default App

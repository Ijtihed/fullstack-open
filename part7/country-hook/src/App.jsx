import React, { useState } from 'react'
import { useCountry } from './hooks'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const Country = ({ country }) => {
  if (!country) return null

  if (!country.found) return <div>not found...</div>

  const c = Array.isArray(country.data) ? country.data[0] : country.data

  return (
    <div>
      <h3>{c.name?.common || c.name}</h3>
      {c.capital && <div>capital {Array.isArray(c.capital) ? c.capital[0] : c.capital}</div>}
      <div>population {c.population}</div>
      {c.flags && (
        <img src={c.flags.png || c.flag} height='100' alt={`flag of ${c.name?.common || c.name}`} />
      )}
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
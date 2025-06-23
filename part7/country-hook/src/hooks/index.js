import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        setCountry({ found: true, data: res.data })
      } catch (err) {
        setCountry({ found: false })
      }
    }

    fetch()
  }, [name])

  return country
} 
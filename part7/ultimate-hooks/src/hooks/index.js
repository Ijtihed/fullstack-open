import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((r) => setResources(r.data))
  }, [baseUrl])

  const create = async (obj) => {
    const { data } = await axios.post(baseUrl, obj)
    setResources((prev) => prev.concat(data))
  }

  return [resources, { create }]
} 
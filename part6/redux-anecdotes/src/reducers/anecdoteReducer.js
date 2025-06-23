import { createSlice } from '@reduxjs/toolkit'
import * as anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(_state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action) {
      const changed = action.payload
      return state.map((a) => (a.id === changed.id ? changed : a))
    },
  },
})

export const { setAnecdotes, appendAnecdote, replaceAnecdote } = anecdoteSlice.actions

// Thunks
export const initializeAnecdotes = () => async (dispatch) => {
  const data = await anecdoteService.getAll()
  dispatch(setAnecdotes(data))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnec = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnec))
}

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const current = getState().anecdotes.find((a) => a.id === id)
  if (!current) return
  const updated = await anecdoteService.voteAnecdote(current)
  dispatch(replaceAnecdote(updated))
}

export default anecdoteSlice.reducer
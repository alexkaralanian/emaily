import axios from 'axios'
import * as types from "./types"

export const setUser = user => ({
	type: types.SET_USER,
	payload: user
}) 

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/currentuser')
	dispatch(setUser(res.data))
}

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token)
	dispatch(setUser(res.data))
}
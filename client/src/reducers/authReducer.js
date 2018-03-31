import * as types from "../actions/types"

const authReducer = (state = null, action) => {
	switch(action.type) {
		case types.SET_USER:
			return action.payload || false
		default: 
			return state;
	}
}

export default authReducer;
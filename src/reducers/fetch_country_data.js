import { FETCH_COUNTRY_INFO } from '../actions/index';


const INITIAL_STATE = { data: {} };

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_COUNTRY_INFO:
			return { ...state, data: action.payload.data[0] };
		default:
			return state;
	}
}

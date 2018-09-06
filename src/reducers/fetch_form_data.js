import { FETCH_DROPDOWN_DATA } from '../actions/index';


const INITIAL_STATE = { dropDownData: {}};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_DROPDOWN_DATA:
      action.payload.data.map(function(country, index){
        action.payload.data[index] = {
          name: country.name,
          label: country.name
        }
      })
			return { ...state, dropDownData: action.payload.data };
		default:
			return state;
	}
}

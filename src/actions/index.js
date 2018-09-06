import axios from 'axios';

export const FETCH_DROPDOWN_DATA = 'FETCH_DROPDOWN_DATA';
export const POST_FORM_DATA = 'POST_FORM_DATA';

// Sample API created and deployed on Heroku
const ROOT_URL = 'https://tranquil-eyrie-10434.herokuapp.com/form';

export function fetchDropDownData() {
	const request = axios.get("https://restcountries.eu/rest/v2/all");

	return {
		type: FETCH_DROPDOWN_DATA,
		payload: request
	};
}

export function postFormData(props) {
	const request = axios.post(ROOT_URL, props);

	return {
		type: POST_FORM_DATA
	};
}

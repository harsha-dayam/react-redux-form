import axios from 'axios';

export const FETCH_DROPDOWN_DATA = 'FETCH_DROPDOWN_DATA';
export const POST_FORM_DATA = 'POST_FORM_DATA';
export const FETCH_COUNTRY_INFO = 'FETCH_COUNTRY_INFO';

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
	const request = axios.post("https://reqres.in/api/users", props);

	return {
		type: POST_FORM_DATA,
		payload: request
	};
}

export function fetchCountryInfo(props) {
	console.log(props);
	const request = axios.get(`https://restcountries.eu/rest/v2/name/${props}?fullText=true`);

	return {
		type: FETCH_COUNTRY_INFO,
		payload: request
	};
}

import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import fetchFormData from './fetch_form_data';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  formData: fetchFormData
});

export default rootReducer;

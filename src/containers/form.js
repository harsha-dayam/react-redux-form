import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import Multiselect from 'react-widgets/lib/Multiselect';
// import 'react-widgets/dist/css/react-widgets.css';
import _ from 'lodash';

import { fetchDropDownData, postFormData } from '../actions/index';

class Form extends Component {
	constructor() {
    super();

		// to show middle name input field
    this.state = {
			checked: false
	  };
  }

	componentWillMount() {
		// Data for multi select searchable dropdown
		this.props.fetchDropDownData();
	}

	handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }

	// Field Validation
	required(value) {
		return !value ? "! Required" : undefined;
	}

	email(value) {
		return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
	}

	phone(value) {
		return value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid Phone Number' : undefined;
	}

	onInputChange(event) {
		this.props.postFormData({data: event.target.defaultValue})
		.then((response) => {
			console.log("The following data was posted to the server:", response.payload.data);
		}).catch(() => {
		    console.log('There was an error in submitting your data');
		});
	}

	// Custom component for redux-form
	renderField(field) {
		const {input, label, type, onChange, meta: { touched, error, warning, invalid }} = field;
		return (
		  <div className="form-group">
		    <label>{label}</label>
		    <span>
		      <input className={`form-control ${touched && invalid ? 'is-invalid' : ''}`} {...input} onBlur={onChange} placeholder={label} type={type} />
		      {touched &&
		        ((error && <span className="alert alert-danger">{error}</span>) ||
		          (warning && <span className="alert alert-warning">{warning}</span>))}
		    </span>
		  </div>
		);
	}

	// On Form Submit
	submitMyForm(submittedFormData) {
		// Resolving the promise axios generates to post response data or do
		// any other action if need be after submitting form data.
		this.props.postFormData(submittedFormData)
		.then((response) => {
			console.log("The following data was posted to the server:", response.payload.data);
		}).catch(() => {
		    console.log('There was an error in submitting your data');
		});
	}

	render() {
		const { handleSubmit, submitMyForm, pristine, reset, submitting, form, formData:{dropDownData}} = this.props;
		// render only when dropdown data is available
		if(_.isEmpty(dropDownData)) {
			return null;
		}

		return (
			<div>
				<h1>Form</h1>
				<form className="was-validated" onSubmit={ handleSubmit(this.submitMyForm.bind(this)) }>
	        <Field
						label="First Name*"
	          name="firstName"
	          component={this.renderField}
	          type="text"
	          placeholder="First Name"
						onChange={_.debounce(this.onInputChange.bind(this), 1000)}
						validate={this.required}
	        />
					{ !this.state.checked &&
						<div>
			        <label className="form-check-label" htmlFor="middleNameCheck">Click to enter Middle Name :&nbsp;</label>
			        <span className="form-check-input">
			          <Field
			            name="middleNameCheck"
			            id="middleNameCheck"
			            component="input"
			            type="checkbox"
									onChange={ this.handleChange.bind(this) }
			          />
			        </span>
		      	</div>
				   }
					 {this.state.checked &&
		          <Field
								label="Middle Name"
		            name="middleName"
		            component={this.renderField}
		            type="text"
		            placeholder="Middle Name"
								onChange={_.debounce(this.onInputChange.bind(this), 1000)}
		          />
						}
	          <Field
							label="Last Name*"
	            name="lastName"
	            component={this.renderField}
	            type="text"
	            placeholder="Last Name"
							validate={this.required}
							onChange={_.debounce(this.onInputChange.bind(this), 1000)}
	          />
			      <Field
							label="Email*"
			        name="email"
			        component={this.renderField}
			        type="email"
			        placeholder="Email"
							validate={[this.required, this.email]}
							onChange={_.debounce(this.onInputChange.bind(this), 1000)}
			      />
			      <Field
							label="Phone*"
			        name="phone"
			        component={this.renderField}
			        type="number"
			        placeholder="Phone Number *"
							validate={[this.required, this.phone]}
							onChange={_.debounce(this.onInputChange.bind(this), 1000)}
			      />
			      <div className="form-check">
			        <label>Sex:&nbsp;</label>
			        <span>
			          <label className="form-check-input"> Male</label>
		            <Field
									className="form-check-input"
		              name="sex"
		              component="input"
		              type="radio"
		              value="male"
									onChange={_.debounce(this.onInputChange.bind(this), 1000)}
		            />
			          <label className="form-check-input"> Female</label>
		            <Field
									className="form-check-input"
									label="Female"
		              name="sex"
		              component="input"
		              type="radio"
		              value="female"
									onChange={_.debounce(this.onInputChange.bind(this), 1000)}
		            />
			        </span>
			      </div>
			      <div>
							<label>Hobbies</label>
			        <Field
			          name="hobbies"
								placeholder="Multiselect Dropdown"
			          component={Multiselect}
			          defaultValue={[]}
			          onBlur={() => props.onBlur()}
			          data={[ 'Cycling', 'Hiking', 'Music' ]}/>
				      </div>
						<div className="form-group">
							<label>Country</label>
							<Field
								name="country"
								component={props =>
										<Select
											value={props.input.value}
											onChange={props.input.onChange}
											onBlur={() => props.input.onBlur(props.input.value)}
											options={dropDownData}
											placeholder="This dropdown is searchable (searchable when values > 10)"
											isSearchable = {dropDownData.length > 10}
										/>
									}
								/>
						</div>
			      <div>
			        <label>Notes</label>
			        <div>
			          <Field name="notes" component="textarea" className="form-control" onChange={_.debounce(this.onInputChange.bind(this), 1000)}/>
			        </div>
			      </div>
			      <div className="button-group">
			        <button type="submit" className="btn btn-success" disabled={pristine || submitting}>
			          Submit
			        </button>
			        <button type="button" className="btn btn-primary" disabled={pristine || submitting} onClick={reset}>
			          Clear Values
			        </button>
			      </div>
	    	</form>
			</div>
		);
	}
}

function mapStateToProps({ formData }) {
  return { formData };
}

Form = reduxForm({
  form: 'Form'
})(Form);

export default connect( mapStateToProps, { fetchDropDownData, postFormData })(Form);

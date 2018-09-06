import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import _ from 'lodash';

import { fetchDropDownData, postFormData } from '../actions/index';

class Form extends Component {
	constructor() {
    super();

    this.state = {
			checked: false
	  };
  }

	componentWillMount() {
		this.props.fetchDropDownData();
	}

	handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }

	required(value) {
		return !value ? "Required" : undefined;
	}

	email(value) {
		return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
	}

	phone(value) {
		return value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid Phone Number' : undefined;
	}

	onInputBlur(event) {
		this.props.postFormData(event.target.defaultValue);

			console.log("Field data posted on blur. Value:", event.target.defaultValue);
	}

	renderField(field) {
		const {input, label, type, onChange, meta: { touched, error, warning }} = field;
		return (
		  <div>
		    <label>{label}:&nbsp;</label>
		    <span>
		      <input {...input} onBlur={onChange} placeholder={label} type={type} />
		      {touched &&
		        ((error && <span className="error">{error}</span>) ||
		          (warning && <span>{warning}</span>))}
		    </span>
		  </div>
		);
	}

	onSubmit(submittedFormData) {
		this.props.postFormData(submittedFormData);
		console.log("Form Submitted with following data:", submittedFormData);
	}

	render() {
		const { handleSubmit, pristine, reset, submitting, form, formData:{dropDownData}} = this.props;
		if(_.isEmpty(dropDownData)) {
			return null;
		}

		return (
			<div>
				<h1>Form</h1>
				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
	        <Field
						label="First Name"
	          name="firstName"
	          component={this.renderField}
	          type="text"
	          placeholder="First Name"
						onChange={_.debounce(this.onInputBlur.bind(this), 1000)}
						validate={this.required}
	        />
					{ !this.state.checked &&
						<div>
			        <label htmlFor="middleNameCheck">Click to enter Middle Name:&nbsp;</label>
			        <span>
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
								onChange={_.debounce(this.onInputBlur.bind(this), 1000)}
		          />
						}
	          <Field
							label="Last Name"
	            name="lastName"
	            component={this.renderField}
	            type="text"
	            placeholder="Last Name"
							validate={this.required}
							onChange={_.debounce(this.onInputBlur.bind(this), 1000)}
	          />
			      <Field
							label="Email"
			        name="email"
			        component={this.renderField}
			        type="email"
			        placeholder="Email"
							validate={[this.required, this.email]}
							onChange={_.debounce(this.onInputBlur.bind(this), 1000)}
			      />
			      <Field
							label="Phone"
			        name="phone"
			        component={this.renderField}
			        type="number"
			        placeholder="Phone Number"
							validate={[this.required, this.phone]}
							onChange={_.debounce(this.onInputBlur.bind(this), 1000)}
			      />
			      <div>
			        <label>Sex:&nbsp;</label>
			        <span>
			          <label>
			            <Field
										label="Male"
			              name="sex"
			              component={this.renderField}
			              type="radio"
			              value="male"
			            />
			          </label>&nbsp;
			          <label>
			            <Field
										label="Female"
			              name="sex"
			              component={this.renderField}
			              type="radio"
			              value="female"
			            />
			          </label>
			        </span>
			      </div>
			      <div>
			        <label>Favorite Color:&nbsp;</label>
			        <span>
			          <Field name="favoriteColor" component="select">
			            <option />
			            <option value="ff0000">Red</option>
			            <option value="00ff00">Green</option>
			            <option value="0000ff">Blue</option>
			          </Field>
			        </span>
			      </div>
						<div>
							<Field name="name"
								component={props =>
										<Select
											value={props.input.value}
											onChange={props.input.onChange}
											onBlur={() => props.input.onBlur(props.input.value)}
											options={dropDownData}
											placeholder="This dropdown is searchable (searchable when values > 10)"
											isMulti = { dropDownData.length > 10 }
											isSearchable = {true}
										/>
									}
								/>
						</div>
			      <div>
			        <label>Notes</label>
			        <div>
			          <Field name="notes" component="textarea" />
			        </div>
			      </div>
			      <div>
			        <button type="submit" disabled={pristine || submitting}>
			          Submit
			        </button>
			        <button type="button" disabled={pristine || submitting} onClick={reset}>
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

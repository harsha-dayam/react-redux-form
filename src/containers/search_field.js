import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import _ from 'lodash';

import { fetchDropDownData } from '../actions/index';
import { fetchCountryInfo } from '../actions/index';

class Form extends Component {
	componentWillMount() {
		this.props.fetchDropDownData();
	}

  onChange(data) {
    this.props.fetchCountryInfo(data.name);
  }

	render() {
    var { formData:{dropDownData}, country:{data}} = this.props;
    if(_.isEmpty(dropDownData)) {
			return null;
		}
		return (
			<div>
				<h3>Search Country Information</h3>
        <div>
          <Field name="countrySearch"
            component={props =>
                <Select
                  value={props.input.value}
                  onChange={this.onChange.bind(this)}
                  onBlur={() => props.input.onBlur(props.input.value)}
                  options={dropDownData}
                  placeholder="Get information of the country of your choice"
                  isSearchable = {true}
                />
              }
            />
        </div>
        { !(_.isEmpty(data)) &&
          <ul className="list-group">
            <li className="list-group-item">Name: {data.name}</li>
            <li className="list-group-item">Population: {data.population}</li>
            <li className="list-group-item">Region: {data.region}</li>
            <li className="list-group-item">Demonym: {data.demonym}</li>
            <li className="list-group-item">Area Code: {data.area}</li>
          </ul>
        }
			</div>
		);
	}
}

function mapStateToProps({ country, formData }) {
  return { country, formData };
}

Form = reduxForm({
  form: 'Form'
})(Form);

export default connect( mapStateToProps, { fetchDropDownData, fetchCountryInfo })(Form);

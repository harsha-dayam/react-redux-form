import React, { Component } from 'react';
import Form from '../containers/form';
import SearchField from '../containers/search_field';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchField />
        <hr />
        <Form />        
      </div>
    );
  }
}

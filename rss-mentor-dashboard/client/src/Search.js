import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const _ = require('lodash');

class Search extends Component {
  constructor(props) {
    super(props);
    const { login } = this.props;
    this.state = {
      selectedOption: { value: login, label: login },
      options: [],
    };
  }

  componentDidMount() {
    fetch('https://kalitamih.github.io/rss-mentor-dashboard/result.json')
      .then(response => response.json())
      .then(data => _.map(data, (item, key) => Object.assign({
        value: key,
        label: key,
      })))
      .then(data => this.setState({
        options: data,
      }));
  }

  handleChange = (selectedOption) => {
    const { onUpdate } = this.props;
    this.setState({ selectedOption });
    onUpdate({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    const { options } = this.state;
    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

Search.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
};

export default Search;

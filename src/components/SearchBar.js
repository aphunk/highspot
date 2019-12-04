import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };
    
    this.props.onInputChange;
  }

  onSearch = (value) => {
    this.setState({
      searchValue: value,
    });
    this.props.onInputChange(value);
  }

  render() {
    return (
      <input
        className="SearchBar"
        onChange={this.onSearch}
        placeholder="Search cards..."
        value={this.state.searchValue}
      />
    )
  }
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;

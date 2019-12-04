import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  onSearch = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
    this.props.onSearch(e.target.value);
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

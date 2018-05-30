import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }
  render() {
    return (
      <input 
        className="form-control mb-3 mt-3"
        value={this.state.term}
        onChange={(event) => this.onInputChange(event.target.value)} 
      />
    );
  }

  onInputChange(term) {
    this.setState({term: term});
    this.props.onChangeSearchTerm(term);
  }
}

export default SearchBar;
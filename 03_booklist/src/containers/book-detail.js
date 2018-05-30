import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
  render() {
    if (!this.props.selected) {
      return <div> No Book Selected </div>;
    }
    return (
      <div className='list-group col-sm-8'>
        {this.props.selected.title}
      </div>
    );
  }
}

function mapStateToProps({selected}) {
  return {
    selected: selected
  };
}

export default connect(mapStateToProps)(BookDetail);


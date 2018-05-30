import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions';
import { bindActionCreators } from 'redux';

class BookList extends Component {
  renderList(books) {
    return books.map(book => (
      <li 
        key={book.title} 
        onClick={() => this.props.selectBook(book)}
        className='list-group-item'
      >
        {book.title}
      </li>
    ));
  }

  render() {
    if (!this.props.books) {
      return <div> No Books </div>;
    }
    return (
      <ul className='list-group col-sm-4'>
        {this.renderList(this.props.books)}      
      </ul>
    );
  }
}

function mapStateToProps({books}) {
  return {
    books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectBook}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);


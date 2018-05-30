import React, { Component } from 'react';
import BookList from './containers/book-list';
import BookDetail from './containers/book-detail';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App row'>
        <BookList/>
        <BookDetail/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PostList from './containers/post_list';
import PostShow from './containers/post_show';
import PostNew from './containers/post_new';

class App extends Component {
  
  render() {
    //    '/new'  '/10'
    return (

      <div className="App container mt-3">
        <Switch>
          <Route exact path='/' component={PostList} />
          <Route path='/new' component={PostNew} />
          <Route path='/:id' component={PostShow} />
        </Switch>
      </div>
    );
  }
}

export default App;

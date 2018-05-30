import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import PostList from './containers/post_list';
import PostNew from './containers/post_new';
import PostShow from './containers/post_show';
import PostEdit from './containers/post_edit';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App container mt-3">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/new" component={PostNew} />
          <Route exact path="/:id" component={PostShow} />
          <Route path="/:id/edit" component={PostEdit} />
        </Switch>
      </div>
    );
  }
}

export default App;

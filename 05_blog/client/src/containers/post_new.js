import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostNew extends Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <div className='text-right'>
          <Link to='/' className='btn btn-secondary'>List</Link>
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='form-group'>
            <label>Name</label>
            <input type='text' className='form-control' name='name' />
          </div>
          <div className='form-group'>
            <label>Title</label>
            <input type='text' className='form-control' name='title' />
          </div>
          <div className='form-group'>
            <label>Content</label>
            <textarea className='form-control' name='content' rows='5' />
          </div>
          <button className='btn btn-primary'>Post</button>
        </form>
      </div>
    );
  }
}

export default PostNew;
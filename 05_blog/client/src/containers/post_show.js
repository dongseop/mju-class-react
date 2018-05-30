import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  render() {
    console.log(this.props);
    const post = { id: 1, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() };
    return (
      <div>
        <h1>{post.title} - {this.props.match.params.id} </h1>
        <div className='text-right'>
          <Link to='/' className='btn btn-secondary'>List</Link>
        </div>
        <blockquote className="blockquote">
          <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
          <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
      </div>
    );
  }
}

export default PostShow;
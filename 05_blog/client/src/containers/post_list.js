import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class PostList extends Component {
  renderPost({id, title, name, createdAt}) {
    return (
      <tr key={id}>
        <td><Link to={`/${id}`}>{title}</Link></td>
        <td>{name}</td>
        <td>{moment(createdAt).format('YYYY-MM-DD')}</td>
      </tr>
    );
  }
  render() {
    const posts = [
      { id: 1, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() },
      { id: 2, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() },
      { id: 3, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() },
      { id: 4, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() },
      { id: 5, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() },
      { id: 6, title: 'test', name: 'aaa', content: 'bbb', createdAt: Date.now() },
    ];
    return (
      <div>
        <h1>Posts</h1>
        <div className='text-right'>
          <Link to='/new' className='btn btn-primary'>New Post</Link>
        </div>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(this.renderPost)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PostList;
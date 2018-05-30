import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import moment from 'moment';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="post-new">
        <h1>Posts</h1>
        <div className='text-right'>
          <Link className="btn btn-primary" to='/new'>New Post</Link>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {_.map(this.props.posts, ({id, title, name, createdAt}) => (
              <tr key={id}>
                <td><Link to={`/${id}`}>{title}</Link></td>
                <td>{name}</td>
                <td>{moment(createdAt).format('YYYY-MM-DD')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts })(PostList);
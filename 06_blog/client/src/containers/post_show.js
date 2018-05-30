import moment from 'moment';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    console.log(this.props.match);
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div className="post-show">
        <h1>{post.title}</h1>
        <div class='row'>
          <div class='col-md-6'>
            <Link className="btn btn-secondary" to='/'>List</Link>
          </div>
          <div class='col-md-6 text-right'>
            <Link className="btn btn-secondary" to={`/${post.id}/edit`}>Edit</Link>
            <button 
              className='btn btn-danger' 
              onClick={this.onDeleteClick.bind(this)}>
              Delete Post
            </button>
          </div>
        </div>
        <blockquote class='blockquote mt-3'>
          <p class="mb-0">{post.content}</p>
          <footer class="blockquote-footer">by {post.name} 
            <cite title="Source Title">{moment(post.createdAt).format('YYYY-MM-DD')}</cite>
          </footer>
        </blockquote>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
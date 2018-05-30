import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    console.log(field)
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    var component = (field.type == 'textarea') ?
      ( <textarea className='form-control' {...field.input} rows='3'></textarea> ) :
      ( <input className="form-control" type="text" {...field.input} placeholder={field.placeholder} />);
      
    return (
      <div className={className}>
        <label>{field.label}</label>
        {component}
        {touched && error && <div className="text-danger">{error}</div>}
      </div>
    );
  }
  renderTextarea(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <textarea className="form-control" {...field.input} placeholder={field.placeholder} />
        {touched && error && <div className="text-danger">{error}</div>}
      </div>
    );
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  render() {
    console.log(this.props.initialValues)
    return (
      <div className="post-new">
        <h1>New Post</h1>
        <div className='text-right'>
          <Link className="btn btn-secondary" to='/'>List</Link>
        </div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field label='Name' name='name' component={this.renderField} placeholder='Your name'/>
          <Field label='Title' name='title' component={this.renderField} />
          <Field label='Content' name='content' component={this.renderField} type='textarea'/>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
          <button type='submit' className='btn btn-primary'>Post</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.name) {
    errors.name = "Enter your name";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }
  return errors;
}

PostNew = reduxForm({
  form: 'PostNewForm' // a unique identifier for this form
})(PostNew)

// You have to connect() to any reducers that you wish to connect to yourself
PostNew = connect(
  ({ posts }, ownProps ) => ({
    // initialValues: posts[ownProps.match.params.id]
  }),
  { createPost } // bind account loading action creator
)(PostNew);

export default PostNew;


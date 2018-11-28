import React, {Component, Fragment} from 'react';
import { API_ROOT, HEADERS } from './constants';

export default class NewReplyForm extends Component {
  state = {
    content: '',
    post_id: this.props.post_id
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ post_id: nextProps.post_id });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/replies`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ content: '' });
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>New Reply:</label>
        <br />
        <input
          type="text"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  };
}
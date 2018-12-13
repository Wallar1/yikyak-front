import React, {Component} from 'react';
import { API_ROOT, HEADERS, animals } from '../constants';

export default class NewReplyForm extends Component {
  state = {
    content: '',
    post_id: this.props.post_id,
    icon: animals[Math.floor(Math.random() * animals.length)]
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
import React,{Component,Fragment} from 'react';
import { API_ROOT, HEADERS } from './constants';

export default class NewPostForm extends Component {
  state = {
    content: '',
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/posts`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ content: '' });
  };

  render = () => {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>New Post:</label>
          <br />
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </Fragment>
    );
  };
}
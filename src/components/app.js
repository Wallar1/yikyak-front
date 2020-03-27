import React, { Component } from 'react';
import AppRouter from './app_router'
import { API_ROOT } from '../constants';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      user: null,
    };
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        user: res.user,
        posts: res.posts
      })
    })
  }

  update = (newstate) => {
    this.setState(newstate)
  }

  render() {
    return (
      <AppRouter setState={this.update} {...this.state}/>
    );
  }
}

import React, { Component, Fragment } from 'react';
import Post from './post'
import { Box, Flex, Card, Image, Heading, Text } from 'rebass'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from './constants';
import NewPostForm from './new_post_form';
import Cable from './cable';


export default class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      activePost: null,
    };
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/posts`)
      .then(res => res.json())
      .then(posts => this.setState({posts}))
  }

  handleClick = id => {
    this.setState({activePost: id})
  }

  handleReceivedPost = (response) => {
    const {post} = response
    this.setState({posts: [...this.state.posts,post]})
  }

  handleReceivedReply = (response) => {
    const {reply} = response
    const posts = [...this.state.posts]
    const post = posts.find(post => post.id === reply.post_id)
    post.replies = [...post.replies, reply]
    this.setState({ posts })
  }

  changeVotes = (id, amount) => {
    const messages = [...this.state.messages]
    const message = messages.find((m)=>{return m.id === id})
    if (message.myVote === 0) {
      message.myVote = amount
    } else {
      message.myVote = 0;
    }
    this.setState({messages})
  }

  render = () => {
    return (
      <Fragment>
        <ActionCable
          channel = {{channel: 'PostsChannel'}}
          onReceived = {this.handleReceivedPost}
        />
        {this.state.posts.length ?
          <Cable
            posts = {this.state.posts}
            handleReceivedReply={this.handleReceivedReply}
          /> : null
        }
        <h2>Posts</h2>
        <Box p="3">
          {this.state.posts.map(m => {
            return <Post activePost={m.id===this.state.activePost} key={m.id} post={m} handleClick={this.handleClick}/>
          })}
        </Box>
        <NewPostForm />
      </Fragment>
    )
  }
}
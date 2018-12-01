import React, { Component, Fragment } from 'react';
import Post from './post'
import { Box, Flex, Card, Image, Heading, Text } from 'rebass'
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from './constants';
import NewPostForm from './new_post_form';
import ReplyCables from './reply_cables';
import VoteCables from './vote_cables';

export default class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      posts: [],
      activePost: null,
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

  handleClick = id => {
    //let activePost = id === this.state.activePost ? null : id
    this.setState({activePost: id})
  }

  handleReceivedPost = (response) => {
    const {post} = response
    let posts = [...this.state.posts]
    let index = posts.findIndex(p => p.id === post.id)
    if(index < 0){
      posts.push(post)
    }else{
      posts[index] = post
    }
    // if(found_post){
    //   found_post = post
    //   console.log(found_post, posts)
    // }else{
    //   posts = [...posts,post]
    // }
    this.setState({posts})
  }

  handleReceivedReply = (response) => {
    const {reply} = response
    const posts = [...this.state.posts]
    const post = posts.find(post => post.id === reply.post_id)
    post.replies = [...post.replies, reply]
    this.setState({ posts })
  }

  handleReceivedVote = (response) => {
    let {vote} = response
    let user = {...this.state.user}
    let found_vote = user.votes.find(v => v.id === vote.id)
    if(found_vote){
      found_vote = vote
    }else{
      user.votes = [...user.votes,vote]
    }
    this.setState({user})
  }

  changeVotes = (id, amount) => {
    const user = this.state.user
    let vote = user.votes.find(v => v.post_id === id)
    if(vote === undefined){
      vote = {
        value: amount,
        post_id: id,
        user_id: user.id
      }
      user.votes = [...user.votes,vote]
    }
    else if (vote.value === 0) {
      vote.value = amount
    }
    else {
      vote.value = 0;
    }
    this.submit_vote(vote)
    this.setState({user})
  }

  submit_vote = (vote) => {
    let method,route
    if(vote.id){
      method = 'PATCH'
      route = `${API_ROOT}/votes/${vote.id}`
    }else{
      method = 'POST'
      route = `${API_ROOT}/votes`
    }

    fetch(route, {
      method: method,
      headers: HEADERS,
      body: JSON.stringify(vote)
    })
  }

  render_reply_cables = () => {
    if(this.state.posts.length){
      return <ReplyCables
        posts = {this.state.posts}
        handleReceivedReply={this.handleReceivedReply}
      />
    }
  }

  render_vote_cables = () => {
    if(!this.state.user){return null}
    if(this.state.user.votes.length){
      return (
        <VoteCables
          votes = {this.state.user.votes}
          handleReceivedVote={this.handleReceivedVote}
        />
      )
    }
  }

  render = () => {
    return (
      <Fragment>
        <ActionCable
          channel = {{channel: 'PostsChannel'}}
          onReceived = {this.handleReceivedPost}
        />
        {this.render_reply_cables()}
        {this.render_vote_cables()}
        <h2>Posts</h2>
        <Box p="3">
          {this.state.posts.map(m => {
            return (
              <Post
                key={m.id}
                activePost={m.id===this.state.activePost}
                post={m}
                handleClick={this.handleClick}
                user={this.state.user}
                changeVotes = {this.changeVotes}
              />
            )
          })}
        </Box>
        <NewPostForm />
      </Fragment>
    )
  }
}
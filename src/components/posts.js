import React, { Component, Fragment } from 'react';
import Post from './post'
import { Box } from 'rebass'
import { ActionCable } from 'react-actioncable-provider';
import NewPostForm from './new_post_form';
import ReplyCables from './reply_cables';
import VoteCables from './vote_cables';
import { API_ROOT, HEADERS } from '../constants';

export default class Posts extends Component {

  handleReceivedPost = (response) => {
    const {post} = response
    let posts = [...this.props.posts]
    let index = posts.findIndex(p => p.id === post.id)
    if(index < 0){
      posts.push(post)
    }else{
      posts[index] = post
    }
    this.props.setState({posts})
  }

  handleReceivedVote = (response) => {
    let {vote} = response
    let user = {...this.props.user}
    let found_vote = user.votes.find(v => v.id === vote.id)
    if(found_vote){
      found_vote = vote
    }else{
      user.votes = [...user.votes,vote]
    }
    this.props.setState({user})
  }

  changeVotes = (id, amount) => {
    const user = this.props.user
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

  render_vote_cables = () => {
    if(!this.props.user){return null}
    if(this.props.user.votes.length){
      return (
        <VoteCables
          votes = {this.props.user.votes}
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
        {this.render_vote_cables()}
        
        <h2>Posts</h2>

        <NewPostForm />
        <Box p="3">
          {this.props.posts.map(m => {
            return (
              <Post
                key={m.id}
                post={m}
                user={this.props.user}
                changeVotes = {this.changeVotes}
              />
            )
          })}
        </Box>
      </Fragment>
    )
  }
}
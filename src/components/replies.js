import React, {Component} from 'react';
import NewReplyForm from './new_reply_form';
import { Flex, Box } from 'rebass'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ReplyCables from './reply_cables';

export default class Replies extends Component {
  constructor(props){
    super(props)
  }

  handleReceivedReply = (response) => {
    const {reply} = response
    const posts = [...this.props.posts]
    const post = posts.find(post => post.id === reply.post_id)
    post.replies = [...post.replies, reply]
    this.props.setState({ posts })
  }

  render_reply_cables = () => {
    return (this.props.posts &&
      <ReplyCables
        posts = {this.props.posts}
        handleReceivedReply={this.handleReceivedReply}
      />
    )
  }
  render = () => {
    return (
      <Box>
        {this.render_reply_cables()}
        <Link to='/'> Back to all Posts </Link>
        <Flex flexDirection='row' justifyContent='center'>
          <Flex flexDirection='column'>
            <ul>{orderedReplies(this.props.post.replies)}</ul>
            <NewReplyForm post_id={this.props.post.id} />
          </Flex>
        </Flex>
      </Box>
    );
  }
};

const Li = styled.li`
  padding: 1em;
  border-bottom: 1px solid #c0c8d6;
  list-style-type: none;
  width: 70vw;
`;

const orderedReplies = replies => {
  const sortedReplies = replies.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedReplies.map(r => {
    return (
      <Li key={r.id}>
        <Flex>
          <img src={require(`../animal_icons/${r.icon}_128px.png`)} alt={`picture of a ${r.icon}`} />
          <Flex pl={40} alignItems='center'>
            <p>{r.content}</p>
          </Flex>
        </Flex>
      </Li>
    )
  });
};
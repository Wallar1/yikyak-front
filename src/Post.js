import React,{Component} from 'react'
import { Box, Flex, Card, Image, Heading, Text } from 'rebass'
import RepliesArea from './replies_area';

export default class Post extends Component{
  constructor(props){
    super(props)
  }

  handleClick = (e) => {
    this.props.handleClick(this.props.post.id)
  }

  render(){
    return (
      <div onClick={this.handleClick}>
        <Flex justifyContent="space-between">
          <Box>
            <Text>
              {this.props.post.content}
            </Text>
          </Box>
          <Box>
            <p onClick={() => this.changeVotes(this.props.post.id,1)}>^</p>
            {this.props.post.votes + this.props.post.myVote}
            <p  onClick={() => this.changeVotes(this.props.post.id,-1)}>v</p>
          </Box>
        </Flex>
        <Flex justifyContent="space-around">
          <Box>
            {this.props.post.created_at}
          </Box>
          <Box>
            {`${this.props.post.replies.length} replies`}
          </Box>
        </Flex>
        {this.props.activePost ? 
          <RepliesArea
            post = {this.props.post}
          /> : null
        }
        <hr/>
      </div>
    )
  }
}

//helpers

const findActivePost = (posts, activePost) => {
  return posts.find(
    post => post.id === activePost
  );
};
import React,{Component} from 'react'
import { Box, Flex, Card, Image, Heading, Text } from 'rebass'
import RepliesArea from './replies_area';
import { FaRegThumbsDown,  FaRegThumbsUp } from 'react-icons/fa';

export default class Post extends Component{
  constructor(props){
    super(props)
  }

  handleClick = (e) => {
    this.props.handleClick(this.props.post.id)
  }

  userPostVote = ()=> {
    const votes = [...this.props.user.votes]
    const vote = votes.find(v => v.post_id === this.props.post.id)
    return vote ? vote.value : 0
  }

  vote_value = () => {
    if(this.props.post.votes.length === 0){return 0}
    return this.props.post.votes.reduce((total,vote) => total + vote.value,0)
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
            <p onClick={() => this.props.changeVotes(this.props.post.id,1)}>
              <FaRegThumbsUp color='green'/>
            </p>
            <p>{this.vote_value()}</p>
            <p  onClick={() => this.props.changeVotes(this.props.post.id,-1)}>
              <FaRegThumbsDown color='darkRed'/>
            </p>
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
            user = {this.props.user}
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
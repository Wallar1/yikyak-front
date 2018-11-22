import React,{Component} from 'react'
import {
    Box,
    Flex,
    Card,
    Image,
    Heading,
    Text
  } from 'rebass'

export default class Post extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <Flex justifyContent="space-between">
            <Box>
              <Text>
                  {this.props.post.message}
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
            {this.props.post.createdAt}
          </Box>
          <Box>
            {`${this.props.post.replies.length} replies`}
          </Box>
        </Flex>
        <hr/>
      </>

    )
  }
}
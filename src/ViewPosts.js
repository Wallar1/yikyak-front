import React, { Component } from 'react';
import Post from './Post'
import {
    Box,
    Flex,
    Card,
    Image,
    Heading,
    Text
  } from 'rebass'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ViewPosts extends Component {

    constructor(props) {
        super(props);
        const messages = [
            { 
                id: 1,
                message: 'sdflkasjdf asldkfjsadlfkjsadflkasjdf saldfkjasdlfkjsad flk',
                votes: 5,
                lat: 90,
                lng: 90,
                createdAt: '10h',
                userid: 'asdf',
                myVote: 0,
                replies: [
                  {
                    content: 'reply 1'
                  },
                  {
                    content: 'reply 2'
                  },
                ]
            },
            { 
                id: 2,
                message: 'asdfjlksjfd lsakdfj lskdfjlsdfjk asldkfjsaldfkj sdalkfjsadlfkj sdflkj',
                votes: 5,
                lat: 90,
                lng: 90,
                createdAt: '5h',
                userid: 'asdf',
                myVote: 0,
                replies: [
                  {
                    content: 'reply 1'
                  },
                  {
                    content: 'reply 2'
                  },
                  {
                    content: 'reply 3'
                  }
                ]
            },
        ];
        this.state = { messages };
    }

    changeVotes = (id, amount) => {
        let messages = [...this.state.messages]
        let message= messages.find((m)=>{return m.id === id})
        if (message.myVote === 0) {
            message.myVote = amount
        } else {
            message.myVote = 0;
        }
       
     //   message.votes += amount
        this.setState({messages})
    }

    render() {
        return (
            <Box p="3">
                {this.state.messages.map(m => {
                  return <Post post={m} />
                })}
            </Box>
        )

    }
}
import React, { Component } from 'react';
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
                createdAt: new Date(),
                userid: 'asdf',
                myVote: 0,
            },
            { 
                id: 2,
                message: 'asdfjlksjfd lsakdfj lskdfjlsdfjk asldkfjsaldfkj sdalkfjsadlfkj sdflkj',
                votes: 5,
                lat: 90,
                lng: 90,
                createdAt: new Date(),
                userid: 'asdf',
                myVote: 0,
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
                    return <>
                    <Flex justifyContent="space-between">
                        <Box>
                        <Text>
                            {m.message}
                        </Text>
                        </Box>
                        <Box>
                            <p onClick={() => this.changeVotes(m.id,1)}>^</p>
                            {m.votes + m.myVote}
                            <p  onClick={() => this.changeVotes(m.id,-1)}>v</p>
                        </Box>
                    </Flex>
                    <hr/>
                    </>
                })}
            </Box>
        )

    }
}
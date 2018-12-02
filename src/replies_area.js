import React from 'react';
import NewReplyForm from './new_reply_form';
import { Flex } from 'rebass'
import styled from 'styled-components'

const RepliesArea = ({post: { id, content, replies }}) => {
  return (
    <Flex flexDirection='row' justifyContent='center'>
      <Flex flexDirection='column'>
        <ul>{orderedReplies(replies)}</ul>
        <NewReplyForm post_id={id} />
      </Flex>
    </Flex>
  );
};

export default RepliesArea;

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
          <img src={require(`./animal_icons/${r.icon}_128px.png`)} alt={`picture of a ${r.icon}`} />
          <Flex pl={40} alignItems='center'>
            <p>{r.content}</p>
          </Flex>
        </Flex>
      </Li>
    )
  });
};
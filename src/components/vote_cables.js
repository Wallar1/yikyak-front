import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const VoteCables = ({ votes, handleReceivedVote }) => {
  return (
    <Fragment>
      {votes.map( vote => {
        return (
          <ActionCable
            key = {vote.id}
            channel = {{channel: 'VotesChannel', post: vote.post_id ? vote.post_id : vote.reply_id}}
            onReceived = {handleReceivedVote}
          />
        )
      })}
    </Fragment>
  )
}

export default VoteCables;
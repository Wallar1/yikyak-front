import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ posts, handleReceivedReply }) => {
  return (
    <Fragment>
      {posts.map( post => {
        return (
          <ActionCable
            key = {post.id}
            channel = {{channel: 'RepliesChannel', post: post.id}}
            onReceived = {handleReceivedReply}
          />
        )
      })}
    </Fragment>
  )
}

export default Cable;
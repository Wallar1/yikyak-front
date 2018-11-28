import React,{Fragment} from 'react';
import NewReplyForm from './new_reply_form';

const RepliesArea = ({post: { id, content, replies }}) => {
  return (
    <Fragment>
      <ul>{orderedReplies(replies)}</ul>
      <NewReplyForm post_id={id} />
    </Fragment>
  );
};

export default RepliesArea;

// helpers

const orderedReplies = replies => {
  const sortedReplies = replies.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedReplies.map(r => {
    return <li key={r.id}>{r.content}</li>;
  });
};
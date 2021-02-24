import React from 'react';
import Comment from './Comment';
import CommentField from './CommentField';
import { deleteCommentRequest } from '../actions/comments';
import { connect } from 'react-redux';
import { Box, Grow, Collapse } from '@material-ui/core';

function CommentList({
  open,
  comments,
  threadId,
  toggleOpen,
  currentUser,
  handleChange,
  handleSubmit,
  currentUserIsMod,
  currentUserIsMember,
  deleteCommentRequest,
}) {

  const sortCommentsByCreation = () => {
    return comments.sort( (c1, c2) => new Date(c1.posted) - new Date(c2.posted) );
  }
  
  const renderComments = () => {

    let sortedComments = sortCommentsByCreation();

    return sortedComments.map( (comment, idx) => {
      return (
        <Grow in={open} {...(open ? { timeout: idx * 500 } : {})} key={comment.id}>
          <div>
            <Comment
              key={comment.id}
              {...comment}
              deleteComment={deleteComment}
              currentUserIsMod={currentUserIsMod}
            />
          </div> 
        </Grow>
      );
    });
  }

  const deleteComment = e => {
    const commentId = e.target.parentNode.dataset.commentId;
    deleteCommentRequest(commentId);
  }

  return (
    <div>
      <Collapse in={open}>
        <div>
          <Box>
            { open && renderComments() }
          </Box>
          {
            (open && currentUserIsMember)
            && (
              <Grow in={open} {...(open ? { timeout: (comments.length + 1) * 500 } : {})}>
                <div>
                  <CommentField
                    threadId={threadId}
                    currentUser={currentUser}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </Grow>
            )
          }
        </div>
      </Collapse>
    </div>
  );
}

export default connect( null, { deleteCommentRequest })(CommentList);
import React, { Component } from 'react';
import CommentList from '../components/CommentList';

class DiscussionContainer extends Component {
  render() {
    return (
      <div className='container-discussion'>
        <h2>Discussion</h2>
         <CommentList comments={} />
         <FormField handleSubmit={} />
      </div>
    );
  }
}

export default DiscussionContainer;
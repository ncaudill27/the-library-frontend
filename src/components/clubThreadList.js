import React from 'react';

import ThreadShow from "../components/ThreadShow"

const ThreadList = ({
  currentUser,
  currentUserIsMember,
  currentUserIsMod,
  threads,
}) => {
  return threads.map(thread => {
    return (
      <ThreadShow
        key={thread.id}
        {...thread}
        currentUser={currentUser}
        currentUserIsMod={currentUserIsMod}
        currentUserIsMember={currentUserIsMember}
      />
    )
  })
}

export default ThreadList;
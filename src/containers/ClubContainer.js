import React, { useState } from "react"
import { connect } from "react-redux"
import { memberLeaveRequest } from "../actions/users"

import Club from "../components/clubShow"

function ClubContainer({
  id,
  name,
  users,
  threads,
  memberships,
  activeBook,
  currentUser,
  description,
  currentUserIsMod,
  currentUserIsMember,
}) {
  threads = threads.filter(t => t.clubId === id)

  const [isManagingUsers, setModding] = useState(false)
  const toggleUserManagement = () => setModding(prev => !prev)

  const clubMembers = () => {
    // ! optimize this
    // ! clubMemberIds = memberships.map( m => m.clubId !== clubId || m.userId )
    const clubMemberships = memberships.filter(m => m.clubId === id)
    // ! clubMemberIds.map( id => users.find( u => u.id === id ) )
    // ? a way to keep this below O(n2) ?
    const members = clubMemberships.map(m => users.find(u => u.id === m.userId))
    return members
  }

  return (
    <Club
      id={id}
      name={name}
      threads={threads}
      activeBook={activeBook}
      currentUser={currentUser}
      description={description}
      clubMembers={clubMembers()}
      isManagingUsers={isManagingUsers}
      currentUserIsMod={currentUserIsMod}
      memberLeaveRequest={memberLeaveRequest}
      currentUserIsMember={currentUserIsMember}
      toggleUserManagement={toggleUserManagement}
    />
  )
}

const mapStateToProps = ({ threads, users }) => ({
  threads: threads.data,
  threadsPending: threads.pending,
  users: users.data,
  usersPending: users.pending,
  currentUser: users.currentUser,
  memberships: users.memberships,
})

export default connect(mapStateToProps)(ClubContainer)

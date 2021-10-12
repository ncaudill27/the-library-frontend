import React from "react"
import ClubMenu from "../components/ClubMenu"
import ThreadForm from "../components/ThreadForm"
import ThreadList from "./clubThreadList"
import BookShow from "../containers/bookShow"
import UserManagement from "./clubUserManagement"
/* ------------
  Material imports
---------- */
import { makeStyles, Typography } from "@material-ui/core"

function ClubShow({
  id,
  name,
  threads,
  isManagingUsers,
  activeBook,
  currentUser,
  description,
  clubMembers,
  currentUserIsMod,
  memberLeaveRequest,
  currentUserIsMember,
  toggleUserManagement,
}) {
  const classes = useStyles()

  console.log(isManagingUsers);
  return (
    <div className={classes.root}>
      <Typography variant="h2">{name}</Typography>
      <ClubMenu
        id={id}
        currentUserIsMod={currentUserIsMod}
        toggleUserManagement={toggleUserManagement}
        currentUserIsMember={currentUserIsMember}
      />
      <UserManagement
        isOpen={isManagingUsers}
        clubMembers={clubMembers}
        currentUser={currentUser}
        memberLeaveRequest={memberLeaveRequest}
        toggleUserManagement={toggleUserManagement}
      />
      <Typography variant="subtitle1" paragraph>
        {description}
      </Typography>
      <BookShow isbn={activeBook} />
      <div className={classes.threads}>
        <Typography variant="h3">Discussion</Typography>
        {currentUserIsMod && <ThreadForm clubId={id} />}
        {!!threads.length && (
          <ThreadList
            threads={threads}
            currentUser={currentUser}
            currentUserIsMod={currentUserIsMod}
            currentUserIsMember={currentUserIsMember}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    marginTop: theme.spacing(4),
  },
  threads: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(-2),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}))

export default ClubShow

import React, { useState } from "react"
import { connect } from "react-redux"
import { memberLeaveRequest } from "../actions/users"
import ClubMenu from "../components/ClubMenu"
import ThreadShow from "../components/ThreadShow"
import ThreadForm from "../components/ThreadForm"
import BookShow from "../containers/bookShow"
/* ------------
  Material imports
---------- */
import {
  makeStyles,
  Button,
  Typography,
  Box,
  Fade,
  Backdrop,
  Modal,
} from "@material-ui/core"

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px",
  },
  innerModal: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: "2px",
    postion: "relative",
  },
  kickButton: {
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    margin: theme.spacing(1),
  },
}))

const ManageUsers = ({
  clubMembers,
  currentUser,
  modMembers,
  toggleModMembers,
}) => {
  const classes = useStyles()

  const handleKick = userId => {
    memberLeaveRequest(userId)
  }

  const members = clubMembers().map(member => {
    return (
      member.id !== currentUser.id && (
        <Box
          key={member.id}
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Typography variant="h5">{member.username}</Typography>
          <Button
            onClick={() => handleKick(member.id)}
            variant="contained"
            className={classes.kickButton}
          >
            Kick
          </Button>
        </Box>
      )
    )
  })

  // if (!modMembers) return null
  return (
    <Modal
      className={classes.modal}
      open={modMembers}
      onClose={toggleModMembers}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modMembers}>
        <div className={classes.innerModal}>{members}</div>
      </Fade>
    </Modal>
  )
}

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
  memberLeaveRequest,
  currentUserIsMember,
}) {
  const classes = useStyles()
  threads = threads.filter(t => t.clubId === id)

  const [modMembers, setModding] = useState(false)
  const toggleModMembers = () => setModding(prev => !prev)

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
    <div className={classes.root}>
      <Typography variant="h2">{name}</Typography>
      <ClubMenu
        id={id}
        currentUserIsMod={currentUserIsMod}
        toggleModMembers={toggleModMembers}
        currentUserIsMember={currentUserIsMember}
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
      <ManageUsers
        modMembers={modMembers}
        clubMembers={clubMembers}
        currentUser={currentUser}
        toggleModMembers={toggleModMembers}
        memberLeaveRequest={memberLeaveRequest}
      />
    </div>
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

export default connect(mapStateToProps, { memberLeaveRequest })(ClubContainer)

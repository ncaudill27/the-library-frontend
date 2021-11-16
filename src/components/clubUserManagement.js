import React from "react"
import { connect } from "react-redux"
import { memberLeaveRequest } from "../actions/users"

import {
  makeStyles,
  Button,
  Typography,
  Box,
  Fade,
  Backdrop,
  Modal,
} from "@material-ui/core"

const UserManagement = ({
  isOpen,
  clubMembers,
  currentUser,
  memberLeaveRequest,
  toggleUserManagement,
}) => {
  const classes = useStyles()

  const handleKick = userId => {
    memberLeaveRequest(userId)
  }

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={toggleUserManagement}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.innerModal}>
          {!!clubMembers.length && clubMembers.map(member => {
            console.log(member);
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
          })}
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles(theme => ({
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

export default connect(null, { memberLeaveRequest })(UserManagement)

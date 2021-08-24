import React, { useState } from "react"
import { connect } from "react-redux"
import { patchCommentRequest } from "../actions/comments"

import {
  makeStyles,
  Avatar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Slide,
} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear"

const useStyles = makeStyles(theme => ({
  comment: {
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    marginTop: theme.spacing(1),
  },
  pushBot: {
    marginBottom: theme.spacing(1),
  },
  username: {
    marginLeft: theme.spacing(1),
  },
  edit: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
  delete: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
  },
  cancel: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
  },
}))

const EditForm = ({
  comment,
  commentSet,
  editComment,
  toggleEditable,
  editable,
}) => {
  const classes = useStyles()

  return (
    <Slide direction="right" in={editable} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.pushBot}
      >
        <TextField
          id="comment-edit"
          type="text"
          variant="outlined"
          size="small"
          color="secondary"
          value={comment}
          onChange={e => commentSet(e.target.value)}
        />
        <Button
          size="small"
          onClick={editComment}
          variant="contained"
          className={classes.edit}
        >
          Edit
        </Button>
        {/* <Button size='small' variant='contained'><ClearIcon /></Button> */}
        <IconButton
          size="small"
          onClick={toggleEditable}
          className={classes.cancel}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </Slide>
  )
}

const CommentOptions = ({
  id,
  toggleEditable,
  deleteComment,
  currentUserIsMod,
  isContentOwner,
  shown,
}) => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      data-comment-id={id}
      className={classes.pushBot}
    >
      <Slide direction="left" in={shown} mountOnEnter unmountOnExit>
        <div>
          {isContentOwner() && (
            <Button
              className={classes.edit}
              variant="contained"
              onClick={toggleEditable}
            >
              EDIT
            </Button>
          )}
          {(currentUserIsMod || isContentOwner()) && (
            <Button
              data-comment-id={id}
              className={classes.delete}
              variant="contained"
              onClick={deleteComment}
            >
              DELETE
            </Button>
          )}
        </div>
      </Slide>
    </Box>
  )
}

const CommentContent = ({
  commentsPending,
  commentsEditing,
  id,
  content,
  editable,
}) => {
  const classes = useStyles()

  if (commentsPending && commentsEditing === id.toString(10)) return null
  return (
    <Slide direction="left" in={!editable} mountOnEnter unmountOnExit>
      <div>
        <Typography variant="body1" className={classes.pushBot}>
          {content}
        </Typography>
      </div>
    </Slide>
  )
}

const Comment = ({
  id,
  users,
  posted,
  userId,
  content,
  currentUser,
  deleteComment,
  commentsEditing,
  commentsPending,
  currentUserIsMod,
  patchCommentRequest,
}) => {
  const classes = useStyles()

  const user = users.find(user => user.id === userId)
  const { username, avatar } = user

  const [editable, editableSet] = useState(false)
  const toggleEditable = () => editableSet(prev => !prev)

  const [shown, shownSet] = useState(false)
  const toggleShown = () => shownSet(prev => !prev)

  const [comment, commentSet] = useState(content)

  const isContentOwner = () => currentUser.id === userId

  const editComment = e => {
    e.preventDefault()
    patchCommentRequest({ content: comment, id })
    toggleEditable()
  }

  // todo move to utils folder
  const parseTime = timeStamp => {
    timeStamp = new Date(timeStamp)
    const date = timeStamp.getDate()
    const month = timeStamp.getMonth()
    const year = timeStamp.getFullYear().toString().slice(2)

    return `${month + 1}/${date}/${year}`
  }

  return (
    <Container onClick={toggleShown} className={classes.comment}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.pushBot}
      >
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Avatar src={avatar} alt={`${username}'s avatar`} />
          <Typography className={classes.username} variant="h6" noWrap>
            {username}
          </Typography>
        </Box>
        <Typography variant="caption">• {parseTime(posted)}</Typography>
      </Box>
      <EditForm
        comment={comment}
        editable={editable}
        commentSet={commentSet}
        editComment={editComment}
        toggleEditable={toggleEditable}
      />
      <CommentContent
        id={id}
        editable={editable}
        content={content}
        commentsPending={commentsPending}
        commentsEditing={commentsEditing}
      />
      <CommentOptions
        id={id}
        shown={shown}
        toggleShown={toggleShown}
        deleteComment={deleteComment}
        isContentOwner={isContentOwner}
        currentUserIsMod={currentUserIsMod}
        toggleEditable={toggleEditable}
      />
    </Container>
  )
}

const mapStateToProps = ({ users, comments }) => ({
  users: users.data,
  currentUser: users.currentUser,
  commentsPending: comments.pending,
  commentsEditing: comments.editing,
})

export default connect(mapStateToProps, { patchCommentRequest })(Comment)

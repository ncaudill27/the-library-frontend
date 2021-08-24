import React, { useState } from "react"
import { connect } from "react-redux"
import { postComment } from "../actions/comments"
/* ----------
  Material imports
---------- */
import {
  makeStyles,
  Box,
  Button,
  TextField,
  Container,
} from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}))

const CommentField = ({
  currentUser: { id: userId },
  postComment,
  threadId,
}) => {
  const [comment, setComment] = useState("")
  const classes = useStyles()

  const handleChange = event => {
    setComment(event.target.value)
  }

  const handleSubmit = () => {
    const payload = {
      user_id: userId,
      board_id: threadId,
      content: comment,
    }
    postComment(payload)
    setComment("")
  }

  return (
    <Container className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField
          label="New comment"
          variant="outlined"
          size="small"
          color="secondary"
          value={comment}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          <SendIcon />
        </Button>
      </Box>
    </Container>
  )
}

export default connect(null, { postComment })(CommentField)

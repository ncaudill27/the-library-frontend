import React, { useState } from "react"
import { connect } from "react-redux"
import { updateUserRequest } from "../actions/users"
import {
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}))

function NewUser({ currentUser, updateUserRequest }) {
  const classes = useStyles()

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")

  const handleChange = (setFn, e) => {
    const value = e.target.value
    setFn(value)
  }

  const handleSubmit = e => {
    const payload = {
      name,
      username,
      bio,
    }
    updateUserRequest(payload, currentUser.id)
    setName("")
    setUsername("")
    setBio("")
  }

  return (
    <Box className={classes.form}>
      <Typography variant="h4">Welcome!</Typography>
      <Typography paragraph>
        Please fill out this information. Don't worry your name or email won't
        be made public.
      </Typography>
      <FormControl fullWidth>
        <TextField
          label="Name"
          value={name}
          onChange={e => handleChange(setName, e)}
        />
        <TextField
          label="Username"
          value={username}
          onChange={e => handleChange(setUsername, e)}
        />
        <TextField
          label="Bio"
          value={bio}
          multiline
          rowsMax={6}
          onChange={e => handleChange(setBio, e)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          className={classes.button}
        >
          Enter Library
        </Button>
      </FormControl>
    </Box>
  )
}

export default connect(null, { updateUserRequest })(NewUser)

import React, { useState } from "react"
import { loginRequest } from "../actions/users"
import { connect } from "react-redux"
import {
  Typography,
  FormControl,
  TextField,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(4),
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}))

function LoginForm({ loginRequest }) {
  const classes = useStyles()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = setFn => e => {
    const value = e.currentTarget.value
    console.log(value)
    setFn(value)
  }

  const handleSubmit = e => {
    const payload = {
      username,
      password,
    }
    console.log(username, password)
    loginRequest(payload)
    setUsername("")
    setPassword("")
  }

  return (
    <Box className={classes.form}>
      <Typography variant="h4">Login</Typography>
      <FormControl fullWidth>
        <TextField label="Username" onChange={handleChange(setUsername)} />
        <TextField
          type="password"
          label="Password"
          onChange={handleChange(setPassword)}
        />
        <Button
          onClick={handleSubmit}
          variant="outlined"
          className={classes.button}
        >
          Login
        </Button>
      </FormControl>
    </Box>
  )
}

export default connect(null, { loginRequest })(LoginForm)

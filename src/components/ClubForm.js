import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { postClubRequest } from "../actions/clubs"
import { addClub } from "../actions/users"
import { connect } from "react-redux"
import {
  Typography,
  FormControl,
  TextField,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles(themes => ({
  form: {
    margin: themes.spacing(3),
  },
  button: {
    backgroundColor: themes.palette.primary.dark,
  },
}))

function ClubForm({ postClubRequest, addClub }) {
  const classes = useStyles()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const [clubId, setClubId] = useState(null)

  const handleChange = (setFn, e) => {
    const value = e.target.value
    setFn(value)
  }

  const handleSubmit = e => {
    const payload = {
      club: {
        name,
        description,
      },
    }

    postClubRequest(payload).then(club => {
      setClubId(club.club.data.id)
    })
    setName("")
    setDescription("")
  }

  if (clubId) return <Redirect to={`/clubs/${clubId}`} />
  return (
    <Box className={classes.form}>
      <Typography variant="h4">Create Club</Typography>
      <FormControl fullWidth>
        <TextField
          label="Club name"
          value={name}
          onChange={e => handleChange(setName, e)}
        />
        <TextField
          label="Description"
          value={description}
          multiline
          rowsMax={6}
          onChange={e => handleChange(setDescription, e)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          className={classes.button}
        >
          Create Club
        </Button>
      </FormControl>
    </Box>
  )
}

export default connect(null, { postClubRequest, addClub })(ClubForm)

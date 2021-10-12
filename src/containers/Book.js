import React, { useState } from "react"
import { connect } from "react-redux"
import { updateUserRequest } from "../actions/users"
import { patchClubRequest } from "../actions/clubs"
import BookShow from "./BookShow"

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Link,
  Typography,
  makeStyles,
  Box,
  Grid,
  Button,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.dark,
  },
  image: {
    height: "auto",
    width: "100px",
    float: "left",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
    float: "left",
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
  option: {
    backgroundColor: "#fff",
  },
}))

function Book({
  title,
  author,
  description,
  src,
  isbn13,
  currentUser,
  updateUserRequest,
  patchClubRequest,
  clubsCurrentUserMods,
}) {
  const classes = useStyles()

  const [showing, showingSet] = useState(false)
  const toggleShowing = () => showingSet(!showing)

  const [updateTarget, updateTargetSet] = useState(currentUser.username)
  const setUpdateTarget = e => updateTargetSet(e.target.value)

  const linkDestination = () => {
    return updateTarget === currentUser.username
      ? `/${updateTarget}`
      : `/clubs/${updateTarget}`
  }

  const isMod = () => !!clubsCurrentUserMods().length

  const renderBookSelectForm = () => (
    <>
      {select()}
      <Link href={linkDestination()} onClick={handleUpdate} underline="none">
        <Button variant="contained" className={classes.button} fullWidth>
          Set
        </Button>
      </Link>
    </>
  )

  const select = () => (
    <FormControl fullWidth>
      <InputLabel>Set {title} for:</InputLabel>
      <Select name="isbn" onChange={setUpdateTarget}>
        <MenuItem value={currentUser.username} className={classes.option}>
          {currentUser.username}
        </MenuItem>
        {isMod() ? clubOptions() : null}
      </Select>
    </FormControl>
  )

  const clubOptions = () => {
    return clubsCurrentUserMods().map(club => (
      <MenuItem key={club.id} value={club.id} className={classes.option}>
        {club.name}
      </MenuItem>
    ))
  }

  const handleUpdate = () => {
    updateTarget === currentUser.username ? userUpdate() : clubUpdate()
  }

  const userUpdate = () => {
    const payload = {
      user: {
        favorite_book_isbn13: isbn13,
      },
    }

    updateUserRequest(payload, currentUser.id)
  }

  const clubUpdate = () => {
    const payload = {
      club: {
        active_book_isbn13: isbn13,
      },
    }

    patchClubRequest(payload, updateTarget)
  }

  const listBook = () => (
    <Box className={classes.root}>
      <Grid container direction="row" spacing={1} justify="center">
        <Grid className={classes.image} item xs={3}>
          <img
            className={classes.img}
            src={src}
            alt={title + " Cover Picture"}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" onClick={toggleShowing}>
            <Link className={classes.link}>{title}</Link>
          </Typography>
          <Typography variant="h5">By: {author}</Typography>
        </Grid>
        <Typography>{description}</Typography>
      </Grid>
      {currentUser ? renderBookSelectForm() : null}
    </Box>
  )

  return showing ? <BookShow isbn={isbn13} hide={toggleShowing} /> : listBook()
}

Book.defaultProps = {
  title: "Title Missing",
  author: "Author Missing",
  src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freadtiger.com%2Fwkp%2Fen%2FBook%3AJulia_Lee&psig=AOvVaw0DuqWZ0Te6nFrmVXIIVetb&ust=1586286067381000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjg6Z--1OgCFQAAAAAdAAAAABAD",
  description: "No description posted",
}

const mapStateToProps = ({ users }) => ({
  currentUser: users.currentUser,
})

export default connect(mapStateToProps, {
  updateUserRequest,
  patchClubRequest,
})(Book)

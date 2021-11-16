import React from "react"

import { Button, Link, Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

function Missing() {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Select a book</Typography>
      <Link
        underline="none"
        component={Button}
        href="/bestsellers"
        className={classes.button}
      >
        New York Times Bestsellers
      </Link>
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#f0f0f0",
    overflow: "auto",
  },
  image: {
    height: "auto",
    width: "auto",
  },
  fallback: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1),
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    marginBottom: theme.spacing(1),
  },
}))

export default Missing

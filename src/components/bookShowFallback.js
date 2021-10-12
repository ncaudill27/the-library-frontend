import React, { useState, useEffect } from "react"
import { Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

function Fallback({ hide }) {
  const classes = useStyles()

  const [message, setMessage] = useState("loading...")

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(`Sorry, additional information for this book is unavailable.`)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Paper elevation={3} onClick={hide} className={classes.root}>
      <Typography variant="h5">{message}</Typography>
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1),
  },
}))

export default Fallback

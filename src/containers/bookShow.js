import React, { useState, useEffect, createRef } from "react"

import Book from "../components/bookShow"
/* ----------
  Material imports
----------- */
import {
  Button,
  Link,
  Typography,
  Paper,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const { REACT_APP_GOOGLE_BOOKS_KEY } = process.env

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

function Missing() {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Select a book</Typography>
      <Link
        href="/bestsellers"
        underline="none"
        component={Button}
        className={classes.button}
      >
        New York Times Bestsellers
      </Link>
    </Paper>
  )
}
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
    <Paper elevation={3} onClick={hide} className={classes.fallback}>
      <Typography variant="h5">{message}</Typography>
    </Paper>
  )
}

function BookShow({ isbn, hide }) {
  const infoRef = createRef()

  const [book, setBook] = useState(null)
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(prev => !prev)

  const [refHeight, setHeight] = useState(null)

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${REACT_APP_GOOGLE_BOOKS_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.items) setBook(data.items[0].volumeInfo)
      })
      .catch(errors => console.log(errors))
  }, [isbn])

  useEffect(() => {
    if (infoRef.current) {
      const height = infoRef.current.getBoundingClientRect().height
      setHeight(height)
    }
  }, [infoRef])

  if (!isbn) return <Missing />
  if (!book) return <Fallback hide={hide} />
  else
    return (
      <Book
        ref={infoRef}
        refHeight={refHeight}
        toggleOpen={toggleOpen}
        hide={hide}
        open={open}
        {...book}
      />
    )
}

export default BookShow

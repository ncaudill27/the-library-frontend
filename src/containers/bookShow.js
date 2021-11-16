import React, { useState, useEffect, createRef } from "react"

import Book from "../components/bookShow"
import Fallback from "../components/bookShowFallback"
import Missing from '../components/bookShowMissing'
/* ----------
  Material imports
----------- */

const { REACT_APP_GOOGLE_BOOKS_KEY } = process.env

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

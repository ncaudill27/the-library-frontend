import React, { useState } from "react"

import BookShow from "./bookShow"
import BookPreview from "../components/bookPreview"

function Book({
  src,
  title,
  author,
  isbn13,
  description,
  clubsCurrentUserMods,
}) {
  const [showing, showingSet] = useState(false)
  const toggleShowing = () => showingSet(!showing)  

  return showing ? (
    <BookShow isbn={isbn13} hide={toggleShowing} />
  ) : (
    <BookPreview
      src={src}
      title={title}
      author={author}
      description={description}
      toggleShowing={toggleShowing}
      clubsCurrentUserIsMod={clubsCurrentUserMods()}
    />
  )
}

Book.defaultProps = {
  title: "Title Missing",
  author: "Author Missing",
  src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freadtiger.com%2Fwkp%2Fen%2FBook%3AJulia_Lee&psig=AOvVaw0DuqWZ0Te6nFrmVXIIVetb&ust=1586286067381000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjg6Z--1OgCFQAAAAAdAAAAABAD",
  description: "No description posted",
}

export default Book

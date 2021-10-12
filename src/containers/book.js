import React, { useState } from "react"
import { connect } from "react-redux"
import { updateUserRequest } from "../actions/users"
import { patchClubRequest } from "../actions/clubs"

import BookShow from "./BookShow"
import BookPreview from "./bookPreview"

function Book({
  src,
  title,
  author,
  isbn13,
  currentUser,
  description,
  patchClubRequest,
  updateUserRequest,
  clubsCurrentUserMods,
}) {
  const [showing, showingSet] = useState(false)
  const toggleShowing = () => showingSet(!showing)

  const [updateTarget, updateTargetSet] = useState(currentUser.username)
  const setUpdateTarget = e => updateTargetSet(e.target.value)

  const linkDestination = () => {
    return updateTarget === currentUser.username
      ? `/${updateTarget}`
      : `/clubs/${updateTarget}`
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

  return showing ? (
    <BookShow isbn={isbn13} hide={toggleShowing} />
  ) : (
    <BookPreview
      src={src}
      title={title}
      author={author}
      update={setUpdateTarget}
      confirm={handleUpdate}
      username={currentUser.username}
      description={description}
      destination={linkDestination()}
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

const mapStateToProps = ({ users }) => ({
  currentUser: users.currentUser,
})

export default connect(mapStateToProps, {
  updateUserRequest,
  patchClubRequest,
})(Book)

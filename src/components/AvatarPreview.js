import React from "react"
import Avatar from "./Avatar"

function AvatarPreview({
  src,
  cancel,
  clubsCurrentUserMods,
  currentUser,
  setUpdateTarget,
  handleUpdate,
}) {
  const clubOptions = () => {
    return clubsCurrentUserMods().map(club => (
      <option key={club.id} value={club.id}>
        {club.name}
      </option>
    ))
  }

  const renderSelect = () => (
    <select name="avatar" onChange={setUpdateTarget}>
      <option value={currentUser.username}>{currentUser.username}</option>
      {clubOptions()}
    </select>
  )

  return (
    <div className="Avatar-preview">
      <h2>Where would you like this picture?</h2>
      <Avatar avatar={src} />
      {renderSelect()}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  )
}

export default AvatarPreview

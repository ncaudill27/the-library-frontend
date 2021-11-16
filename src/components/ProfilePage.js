import React from "react"
import BookShow from "../containers/bookShow"

import { Typography } from "@material-ui/core"

function ProfilePage({ bio, name, currentlyReading }) {
  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Typography variant="body1" paragraph>
        {bio}
      </Typography>
      <BookShow isbn={currentlyReading} />
    </div>
  )
}

export default ProfilePage

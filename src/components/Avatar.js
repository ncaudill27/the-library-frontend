import React from "react"

const Avatar = ({ showing, avatar }) => (
  <img
    className="Avatar"
    src={
      avatar || "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
    }
    alt={showing + "'s avatar" || "User missing"}
  />
)

export default Avatar

import React, { useState } from "react"
import { connect } from "react-redux"
import { addClub } from "../actions/users"
import { logOutUser } from "../actions/users"

import Header from "../components/header"

function HeaderContainer({ currentUser, logOutUser, currentUsersClubs }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Header
      anchorEl={anchorEl}
      open={open}
      close={handleClose}
      currentUser={currentUser}
      currentUsersClubs={currentUsersClubs()}
      handleMenu={handleMenu}
      logOutUser={logOutUser}
    />
  )
}

const mapStateToProps = ({ users }) => ({ currentUser: users.currentUser })

export default connect(mapStateToProps, { addClub, logOutUser })(HeaderContainer)

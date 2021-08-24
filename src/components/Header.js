import React from "react"
import NavBar from "./NavBar"

function Header({ currentUser, logOutUser }) {
  return (
    <header className="Header">
      <NavBar currentUser={currentUser} logOutUser={logOutUser} />
    </header>
  )
}

export default Header

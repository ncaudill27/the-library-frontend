import React from "react"

import ClubList from "../components/ClubList"

import { Link, Menu, MenuItem, makeStyles } from "@material-ui/core"

const HeaderMenu = ({
  anchorEl,
  open,
  close,
  currentUser,
  currentUsersClubs,
}) => {
  const classes = useStyles()

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={close}
    >
      <MenuLink
        href={`/${currentUser.username}`}
        text="Profile"
        handleClose={close}
      />
      <MenuLink
        href="/bestsellers"
        text="NY Times Bestsellers"
        handleClose={close}
      />
      <MenuLink href="/clubs" text="Browse Clubs" handleClose={close} />
      {!!currentUsersClubs.length && <MenuItem disabled>Your clubs</MenuItem>}
      {currentUser && <ClubList styling="sidebar" handleClose={close} />}
      {currentUser && (
        <MenuItem className={classes.create}>
          <Link href="/clubs/new" color="inherit" underline="none">
            Create New Club
          </Link>
        </MenuItem>
      )}
    </Menu>
  )
}

//! why is this forwarding ref?
const MenuLink = React.forwardRef(({ href, text, handleClose }, ref) => {
  const classes = useStyles()

  return (
    <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
      <Link href={href} className={classes.link} underline="none">
        {text}
      </Link>
    </MenuItem>
  )
})

const useStyles = makeStyles(theme => ({
  menuItem: {
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: theme.spacing(0.25),
  },
  create: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
  link: {
    color: theme.palette.secondary.dark,
  },
  menu: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

export default HeaderMenu

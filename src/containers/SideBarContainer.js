import React, { useState, forwardRef } from "react"
import ClubList from "../components/ClubList"
import { connect } from "react-redux"
import { addClub } from "../actions/users"
import { logOutUser } from "../actions/users"

import {
  makeStyles,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Link,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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

const MenuLink = forwardRef(({ href, text, handleClose }, ref) => {
  const classes = useStyles()

  return (
    <MenuItem onClick={handleClose} className={classes.menuItem} ref={ref}>
      <Link href={href} className={classes.link} underline="none">
        {text}
      </Link>
    </MenuItem>
  )
})

const CreateClubButton = () => {
  const classes = useStyles()

  return (
    <MenuItem className={classes.create}>
      <Link href="/clubs/new" color="inherit" underline="none">
        Create New Club
      </Link>
    </MenuItem>
  )
}

function SidebarContainer({ currentUser, logOutUser, currentUsersClubs }) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          onClick={handleMenu}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          The Library
        </Typography>
        {currentUser ? (
          <Button onClick={logOutUser} color="inherit" size="small">
            <Link href="/" color="inherit" underline="none">
              Log Out
            </Link>
          </Button>
        ) : null}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuLink
            href="/bestsellers"
            text="NY Times Bestsellers"
            handleClose={handleClose}
          />
          <MenuLink
            href="/clubs"
            text="Browse Clubs"
            handleClose={handleClose}
          />
          {!!currentUsersClubs().length ? (
            <MenuItem disabled>Your clubs</MenuItem>
          ) : null}
          {currentUser ? (
            <ClubList styling="sidebar" handleClose={handleClose} />
          ) : null}
          {currentUser ? <CreateClubButton /> : null}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ users }) => ({ currentUser: users.currentUser })

export default connect(mapStateToProps, { addClub, logOutUser })(
  SidebarContainer
)

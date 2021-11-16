import React from "react"

import {
  makeStyles,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import HeaderMenu from "./headerMenu"

const Header = ({
  open,
  close,
  anchorEl,
  logOutUser,
  handleMenu,
  currentUser,
  currentUsersClubs,
}) => {
  const classes = useStyles()

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
        {currentUser && (
          <Button onClick={logOutUser} color="inherit" size="small">
            <Link href="/" color="inherit" underline="none">
              Log Out
            </Link>
          </Button>
        )}
        <HeaderMenu
          anchorEl={anchorEl}
          open={open}
          close={close}
          currentUser={currentUser}
          currentUsersClubs={currentUsersClubs}
        />
      </Toolbar>
    </AppBar>
  )
}

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
}))

export default Header

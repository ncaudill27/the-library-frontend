import React from "react"
import ClubList from "../components/ClubList"

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
import HeaderMenu from "./headerMenu"

const Header = ({}) => {
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
        {currentUser ? (
          <Button onClick={logOutUser} color="inherit" size="small">
            <Link href="/" color="inherit" underline="none">
              Log Out
            </Link>
          </Button>
        ) : null}
        <HeaderMenu />
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

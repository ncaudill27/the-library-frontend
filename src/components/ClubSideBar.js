import React from "react"
import { makeStyles, Avatar, Link, Box, MenuItem } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  menuItem: {
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: theme.spacing(0.25),
    marginLeft: theme.spacing(-1),
  },
  link: {
    color: theme.palette.secondary.dark,
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}))

const ClubSideBar = ({ id, name, avatar, handleClose }) => {
  const classes = useStyles()

  return (
    <MenuItem onClick={handleClose} className={classes.menuItem}>
      <Link
        href={`/clubs/${id}`}
        noWrap
        className={classes.link}
        underline="none"
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={avatar}
            alt={name + "'s avatar"}
            className={classes.avatar}
          />
          {name}
        </Box>
      </Link>
    </MenuItem>
  )
}

export default ClubSideBar

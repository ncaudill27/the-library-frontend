import React from "react"

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Link,
  makeStyles,
  Button,
} from "@material-ui/core"

const BookSelect = ({
  title,
  update,
  confirm,
  username,
  destination,
  clubsCurrentUserisMod,
}) => {
  const classes = useStyles()

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Set {title} for:</InputLabel>
        <Select name="isbn" onChange={update}>
          <MenuItem value={username} className={classes.option}>
            {username}
          </MenuItem>
          {clubsCurrentUserisMod.length > 0 &&
            clubsCurrentUserisMod.map(club => (
              <MenuItem
                key={club.id}
                value={club.id}
                className={classes.option}
              >
                {club.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Link href={destination} onClick={confirm} underline="none">
        <Button variant="contained" className={classes.button} fullWidth>
          Set
        </Button>
      </Link>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
  option: {
    backgroundColor: "#fff",
  },
}))

export default BookSelect

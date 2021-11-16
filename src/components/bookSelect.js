import React from "react"
import { connect } from "react-redux"
import { updateUserRequest } from "../actions/users"
import { patchClubRequest } from "../actions/clubs"

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
  patchClubRequest,
  updateUserRequest,
  clubsCurrentUserIsMod,
}) => {
  const classes = useStyles()

  const [updateTarget, updateTargetSet] = useState(currentUser.username)
  const setUpdateTarget = e => updateTargetSet(e.target.value)

  const linkDestination =
    updateTarget === currentUser.username
      ? `/${updateTarget}`
      : `/clubs/${updateTarget}`

  const clubUpdate = () => {
    const payload = {
      club: {
        active_book_isbn13: isbn13,
      },
    }

    patchClubRequest(payload, updateTarget)
  }

  const handleUpdate = () =>
    updateTarget === currentUser.username ? userUpdate() : clubUpdate()

  const userUpdate = () => {
    const payload = {
      user: {
        favorite_book_isbn13: isbn13,
      },
    }

    updateUserRequest(payload, currentUser.id)
  }
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Set {title} as featured book for:</InputLabel>
        <Select name="isbn" onChange={update}>
          <MenuItem value={username} className={classes.option}>
            {username}'s profile
          </MenuItem>
          {clubsCurrentUserIsMod.length > 0 &&
            clubsCurrentUserIsMod.map(club => (
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

const mapStateToProps = ({ users }) => ({
  currentUser: users.currentUser,
})

export default connect(mapStateToProps, {
  updateUserRequest,
  patchClubRequest,
})(BookSelect)

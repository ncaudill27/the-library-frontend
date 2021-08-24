import React, { Component } from "react"
import ClubSideBar from "./ClubSideBar"
import { connect } from "react-redux"
/* ----------
  Material imports
----------- */
import {
  Avatar,
  Typography,
  Link,
  Container,
  makeStyles,
} from "@material-ui/core"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles(theme => ({
  clubBox: {
    marginTop: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary.dark,
  },
}))

const Club = ({ id, name, avatar, description }) => {
  const classes = useStyles()

  return (
    <Box display="flex" className={classes.clubBox}>
      <Avatar alt={name} src={avatar} />
      <Container className={classes.description}>
        <Typography variant="h5">
          <Link
            href={`/clubs/${id}`}
            underline="none"
            className={classes.title}
          >
            {name}
          </Link>
        </Typography>
        <Typography>{description}</Typography>
      </Container>
    </Box>
  )
}

class ClubList extends Component {
  renderClubs = () => {
    let { clubs, currentUser, memberships } = this.props

    const usersMemberships = memberships.filter(
      m => m.userId === currentUser.id
    )
    const usersClubs = usersMemberships.map(m => {
      return clubs.find(c => c.id === m.clubId)
    })

    const userAssociatedClubIds = usersClubs.map(c => c.id)

    clubs = currentUser
      ? clubs.filter(club => !userAssociatedClubIds.includes(club.id))
      : clubs

    return clubs.map(club => <Club key={club.id} {...club} />)
  }

  renderClubsSidebar = () => {
    let { clubs, currentUser, memberships, handleClose } = this.props

    const usersMemberships = memberships.filter(
      m => m.userId === currentUser.id
    )
    clubs = usersMemberships.map(m => {
      return clubs.find(c => c.id === m.clubId)
    })
    clubs = clubs.map(({ id, name, avatar }) => {
      return (
        <ClubSideBar
          key={id}
          id={id}
          name={name}
          avatar={avatar}
          handleClose={handleClose}
        />
      )
    })

    return <>{clubs}</>
  }

  render() {
    const {
      renderClubs,
      renderClubsSidebar,
      props: { styling, memberships, clubs },
    } = this
    return (
      <div className="Club-list">
        {styling === "sidebar" ? null : (
          <Typography variant="h2">Clubs</Typography>
        )}
        {memberships.length && clubs.length
          ? styling === "sidebar"
            ? renderClubsSidebar()
            : renderClubs()
          : null}
      </div>
    )
  }
}

const mapStateToProps = ({ clubs, users }) => ({
  clubs: clubs.data,
  clubsPending: clubs.pending,
  currentUser: users.currentUser,
  memberships: users.memberships,
})

export default connect(mapStateToProps)(ClubList)

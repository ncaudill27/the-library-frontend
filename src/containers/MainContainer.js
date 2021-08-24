import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux"
import { logOutUser } from "../actions/users"

import WelcomeContainer from "../components/WelcomeContainer"
import NYTimes from "./NYTimes"
import ProfilePage from "../components/ProfilePage"
import ClubList from "../components/ClubList"
import ClubContainer from "./ClubContainer"
import ClubForm from "../components/ClubForm"
import FlashMessage from "../components/FlashMessage"
import EditUser from "../components/EditUser"
import AvatarSelection from "../components/AvatarSelection"
/* ----------
  Material imports
---------- */
import { Container } from "@material-ui/core"

class MainContainer extends Component {
  render() {
    const {
      message,
      currentUser,
      memberships,
      usersPending,
      reifyClubById,
      currentUsersClubs,
      clubsCurrentUserMods,
    } = this.props

    return (
      <Container maxWidth="sm">
        {message ? <FlashMessage /> : null}

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <WelcomeContainer
                currentUser={currentUser}
                currentUsersClubs={currentUsersClubs}
              />
            )}
          />

          {currentUser && memberships.length ? (
            <Route
              exact
              path="/avatar-selection"
              render={() => (
                <AvatarSelection
                  currentUser={currentUser}
                  clubsCurrentUserMods={clubsCurrentUserMods}
                />
              )}
            />
          ) : null}

          <Route
            exact
            path="/clubs"
            render={() => <ClubList currentUser={currentUser} />}
          />

          <Route
            exact
            path="/clubs/new"
            render={() => <ClubForm currentUser={currentUser} />}
          />

          {
            //TODO dig into why the container doesn't recognize clubId
            memberships.length ? (
              <Route
                exact
                path="/clubs/:id"
                render={({ match }) => {
                  const club = reifyClubById(match.params.id)
                  return <ClubContainer {...club} />
                }}
              />
            ) : null
          }

          <Route
            exact
            path="/bestsellers"
            render={() => (
              <NYTimes clubsCurrentUserMods={clubsCurrentUserMods} />
            )}
          />

          {currentUser ? (
            <Route
              exact
              path="/:username/settings"
              render={() => <EditUser currentUser={currentUser} />}
            />
          ) : null}
          {usersPending ? null : (
            <Route
              exact
              path="/:username"
              render={() => <ProfilePage {...currentUser} />}
            />
          )}
        </Switch>
      </Container>
    )
  }
}

const mapStateToProps = ({ clubs, users, messages }) => ({
  message: messages.message,
  clubs: clubs.data,
  clubsPending: clubs.pending,
  users: users.data,
  usersPending: users.pending,
  currentUser: users.currentUser,
  memberships: users.memberships,
})

export default connect(mapStateToProps, { logOutUser })(MainContainer)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import WelcomeContainer from './components/WelcomeContainer';
import NYTimes from './containers/NYTimes';
import ProfilePage from './components/ProfilePage';
import ClubList from './components/ClubList';
import ClubContainer from './containers/ClubContainer';
import ClubForm from './components/ClubForm';
import FlashMessage from './components/FlashMessage';
import EditUser from './components/EditUser';
// import AvatarSelection from './components/AvatarSelection';
// import NotFound from './components/NotFound';

import { getClubsRequest } from './actions/clubs';
import { fetchUsers } from './actions/users';
import { fetchThreads } from './actions/threads';
import { fetchComments } from './actions/comments';
import { authorizeToken } from './actions/users';

import { Container } from '@material-ui/core';

class App extends Component {

  componentDidMount() {
    const { getClubsRequest, fetchUsers, fetchThreads, fetchComments, authorizeToken } = this.props;
    if (!!localStorage.getItem('token')) authorizeToken(); //TODO Add await and loading animation
    getClubsRequest();
    fetchUsers();
    fetchThreads();
    fetchComments();
  }
    //TODO move to helpers folder
    currentUsersClubs = () => {
      let { currentUser, memberships, clubs } = this.props;
      const membershipAssociations = memberships.filter( m => m.userId === currentUser.id );
      clubs = membershipAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
      return clubs ? clubs : [];
    }
    //TODO move to helpers folder
    clubsCurrentUserMods = () => {
      let { currentUser, memberships, clubs } = this.props;
      const modAssociations = memberships.filter( m => m.userId === currentUser.id && m.isMod );
      clubs = modAssociations.map( ({clubId}) => clubs.find( c => c.id === clubId ) );
      return clubs;
    }
  
    //TODO move to helpers folder
    reifyClubById = clubId => {
      const { clubs, clubsPending } = this.props;
      
      if ( !clubsPending ) {
        const club = clubs.find( c => c.id === clubId );
        club.id = clubId;
        club.currentUserIsMod = this.clubsCurrentUserMods().includes(club);
        club.currentUserIsMember = this.currentUsersClubs().includes(club);
        return club
      };
    }

  render() {
    const {
      props: {
        message,
        currentUser,
        memberships
      },
      reifyClubById ,
      currentUsersClubs,
      clubsCurrentUserMods
    } = this;

    return <>
      <SidebarContainer currentUsersClubs={currentUsersClubs} />
      { message ? <FlashMessage message={message} /> : null }
      <Container maxWidth='sm'>
        <Switch>
          <Route exact path='/' render={ () =>
            <WelcomeContainer currentUser={currentUser} currentUsersClubs={currentUsersClubs} />
          }/>
          {/* {
            currentUser && memberships.length
            ? <Route exact path='/avatar-selection' render={ () =>
                <AvatarSelection currentUser={currentUser} clubsCurrentUserMods={clubsCurrentUserMods} />
              }/>
            : null
          } */}
          <Route exact path='/clubs' render={ () => <ClubList currentUser={currentUser} /> } />
          <Route exact path='/clubs/new' render={ () => <ClubForm currentUser={currentUser}  /> } />
          {
            memberships.length
            ? <Route exact path='/clubs/:id' render={ ({match}) => {
                const club = reifyClubById(match.params.id);
                return <ClubContainer {...club} />
              }}/>
            : null
          }
          <Route exact path='/bestsellers' render={ () => 
              <NYTimes clubsCurrentUserMods={clubsCurrentUserMods} /> 
          }/>
          {
            currentUser
            ? <Route exact path='/:username/settings' render={ () =>
                <EditUser currentUser={currentUser} />
              }/>
            : null
          }
          {
            currentUser
            ? <Route exact path='/:username' render={ () => 
                <ProfilePage {...currentUser} />
              }/>
            : null
          }
        </Switch>
      </Container>
    </>
  };
}

const mapStateToProps = ({clubs, users, messages}) => ({
  message: messages.message,
  clubs: clubs.data,
  clubsPending: clubs.pending,
  currentUser: users.currentUser,
  memberships: users.memberships
});

export default connect(mapStateToProps, {getClubsRequest, fetchUsers, fetchThreads, fetchComments, authorizeToken })(App);

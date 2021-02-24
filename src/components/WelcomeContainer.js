import React from 'react';
// import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
// import LibraryImg from '../library-welcome1.jpg'
import SignUp from './SignUp';
import NewUser from './NewUser';
import { makeStyles, Typography, Link, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    marginBottom: theme.spacing(1)
  },
  intro: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: '#f0f0f0',
  },
  soon: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  paper: {
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(1)
  }
}))

const JoinClubMessage = () => {
  const classes = useStyles();
  
  return (
    <div>
      <Typography variant='body1' paragraph>
        Not a member of any clubs yet? Check out the "Clubs" tab from the menu on the top left! Here's a shortcut this time.
      </Typography>
      <Link
        href='/clubs'
        underline='none'
        component={Button}
        className={classes.button}        
      >
        Browse clubs to join
      </Link>
    </div>
  );
}

const SelectBookMessage = () => {
  const classes = useStyles();
  
  return (
    <div>
      <Typography variant='body1' paragraph>
        Also, be sure to browse through the New York Times Bestsellers list and mark whichever book you are currently reading. Also found in the menu under "Bestsellers"
      </Typography>
      <Link
        href='/bestsellers'
        underline='none'
        component={Button}
        className={classes.button}
      >
        New York Times Bestsellers
      </Link>
    </div>
  );
}

const ComingSoon = () => {
  const classes = useStyles();

  return (<div>
      <Paper className={classes.soon}>
          <Typography variant='h3'>
            Coming Soon!
          </Typography>
      </Paper>
      <Paper className={classes.paper} square>
        <Typography variant='h6'>
          Recommendations
        </Typography>
        <Typography variant='subtitle1' paragraph>
          Have the hottest/latest books and clubs brought directly to you!
        </Typography>
        <Typography variant='h6'>
          Search
        </Typography>
        <Typography variant='subtitle1' paragraph>
          The current selection of NY Times bestsellers not enough for your needs? Soon you will have the full power of Google available!
        </Typography>
        <Typography variant='h6'>
          Polling
        </Typography>
        <Typography variant='subtitle1' paragraph>
          Club mods, an easier way to vote on your clubs next book will be coming shortly! Allowing users to vote for their next read.
        </Typography>
      </Paper>  
  </div>);
}

const  OnboardingMessage = ({isMember, isReading}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.intro}>
      { isMember() ? null : <JoinClubMessage /> }
      { isReading() ? null : <SelectBookMessage /> }
    </Paper>
  );
}

const  ProperWelcome = ({currentUser, currentUsersClubs, isbn}) => {

  console.log(currentUsersClubs())
  const isReading = () => !!currentUser.currentlyReading;
  const isMember = () => !!currentUsersClubs().length;
  const isOnboarded = () => !isReading() || !isMember();

  return (
    <>
      <Typography variant='h2'>
          Welcome {currentUser.name}!
      </Typography>
     { isOnboarded() && <OnboardingMessage isReading={isReading} isMember={isMember} /> }
      <ComingSoon />
    </>
  )
}

const WelcomeContainer = ({currentUser, currentUsersClubs}) => {

  // const [featured, setFeatured] = useState('');
  
  // todo create Interest class on backend that will fill search query for recommendation
  // useEffect( () => {
  //   fetch('https://www.googleapis.com/books/v1/volumes?q=""+orderBy=relevance')
  //   .then( res => res.json() )
  //   .then( data => setFeatured(data.items[0].volumeInfo.industryIdentifiers[0].identifier) )
  // }, [])
  // <BookShow isbn={isbn} />

  // console.log(currentUser, currentUsersClubs());
  
  return (
    <div className='WelcomeContainer'>
      {/* <img id="library" src={LibraryImg} alt="Library" /> */}
      {
        !!currentUser
        ? !!currentUser.name
          ? <ProperWelcome currentUser={currentUser} currentUsersClubs={currentUsersClubs} />
          : <NewUser currentUser={currentUser} />
        : <>
          <LoginForm />
          <SignUp />
        </>
      }
    </div>
  );
}

export default WelcomeContainer;

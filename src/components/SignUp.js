import React, { useState } from 'react';
import { userPostRequest } from '../actions/users';
import { connect } from 'react-redux';
import { Button, Typography, FormControl, TextField, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  form: {
    margin: theme.spacing(4)
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff'
  }
}));

function SignUp({userPostRequest}) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (setFn, e) => {
    const value = e.currentTarget.value;
    setFn(value);
  }
  
  const handleSubmit = e => {
    const payload = {
        user: {
          email,
          password,
          password_confirmation: confirmation
        }
    };

    userPostRequest(payload);
    setEmail('');
    setPassword('');
    setConfirmation('');
  }

  return (
    <Box className={classes.form}>
      <Typography variant='h4'>
        Sign Up
      </Typography>
      <FormControl fullWidth>
        <TextField label='Email' value={email} onChange={ e => handleChange(setEmail, e) } />
        <TextField type='password' label='Password' value={password} onChange={ e => handleChange(setPassword, e) } />
        <TextField type='password' label='Confirm Password' value={confirmation} onChange={ e => handleChange(setConfirmation, e) } />
        <Button
          onClick={handleSubmit}
          variant='outlined'
          className={classes.button}
        >
          Sign Up
        </Button>
      </FormControl>
    </Box>
  );
}

export default connect(null, { userPostRequest })(SignUp);
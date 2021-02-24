import React, { useState } from 'react';
import CommentList from './CommentList';
import { FormControlLabel, Switch, Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles( theme => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
    height: 'fit-content',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    backgroundColor: '#f0f0f0',
    overflow: 'hidden'
  },
  switch: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%'
  }
}));

function ThreadShow ({
  currentUserIsMember,
  currentUserIsMod,
  currentUser,
  handleSubmit,
  handleChange,
  comments,
  title,
  id
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen( prev => !prev );

  comments = comments.filter(comment => id === comment.threadId);

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography variant='h4'>
        {title}
      </Typography>
      <CommentList
        open={open}
        threadId={id}
        comments={comments}
        toggleOpen={toggleOpen}
        currentUser={currentUser}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        currentUserIsMod={currentUserIsMod}
        currentUserIsMember={currentUserIsMember}
      />
      <Grid container justify='center' className={classes.switch}>
        <FormControlLabel
          control={<Switch checked={open} onChange={toggleOpen} />}
          label={ open ? 'Close' : 'Open' }
        />
      </Grid>
    </Paper>
  );
}

const mapStateToProps = ({comments}) => ({
  comments: comments.data,
  commentsPending: comments.pending
});

export default connect(mapStateToProps)(ThreadShow);
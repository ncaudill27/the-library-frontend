import React, { useState, useEffect, createRef } from 'react';
import StarRating from './StarRating';
/* ----------
  Material imports
----------- */
import { FormControlLabel, Switch, Grid, Button, Link, Typography, Paper, Box, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const { REACT_APP_GOOGLE_BOOKS_KEY } = process.env;

const useStyles = makeStyles( theme => ({
  root: {
    margin: theme.spacing(-1)
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: '#f0f0f0',
    overflow: 'auto'
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: '500',
    paddingTop: theme.spacing(1),
    height: '100%',
    width: '100%'
  },
  details: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),

    float: 'right',
  },
  image: {
    height: 'auto',
    width: 'auto'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  description: {
    textAlign: 'justify'
  },
  fallback: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1)
  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    marginBottom: theme.spacing(1)
  },
  switch: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    marginBottom: theme.spacing(3)
  }
}));

function Missing() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5'>
        Select a book
      </Typography>
      <Link
        href='/bestsellers'
        underline='none'
        component={Button}
        className={classes.button}
      >
        New York Times Bestsellers
      </Link>
    </Paper>
  )
}
function Fallback({hide}) {
  const classes = useStyles();

  const [message, setMessage] = useState('loading...');
  
  useEffect( () => {
    const timer = setTimeout( () => {
      setMessage(`Sorry, additional information for this book is unavailable.`);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Paper elevation={3} onClick={hide} className={classes.fallback}>
      <Typography variant='h5'>
        {message}
      </Typography>
    </Paper>
  )
}

function BookShow({ isbn, hide }) {
  const classes = useStyles();

  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen( prev => !prev );

  const [reqHeight, setHeight] = useState(null);

  useEffect( () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${REACT_APP_GOOGLE_BOOKS_KEY}`)
    .then( res => res.json() )
    .then( data => {
      if (data.items) setBook(data.items[0].volumeInfo)
    })
    .catch(errors => console.log(errors));
  }, [isbn]);

  const infoRef = createRef();

  useEffect( () => {
    if (infoRef.current) {
      const height = infoRef.current.getBoundingClientRect().height;
      setHeight(height);
    };
  }, [infoRef]);

  if (!isbn) return <Missing />;
  if (!book) return <Fallback hide={hide} />;
  else return (
    <Box className={classes.root} onClick={hide}>
      <Paper elevation={3}>
        <Typography variant='h5' align='center' className={classes.title}>
          {book.title}
        </Typography>
      </Paper>
      <Collapse in={open} collapsedHeight={320}>
        <Paper elevation={1} className={classes.paper} square ref={infoRef}>
          <Grid className={classes.details} xs={6} item container direction='column' spacing={0} justify='flex-start' alignItems='center'>
            <Grid item>
              <img className={classes.img} src={book.imageLinks ? book.imageLinks.thumbnail : ''} alt={book.title + " Cover Art"} />
            </Grid>
            <Grid item>
              <Typography variant='h6' align='center'>
                Author{book.authors.length <= 1 ? '' : 's'}: {[...book.authors].join(', ')}
              </Typography>
            </Grid>
            <Grid item>
                <StarRating count={book.averageRating} />
            </Grid>
          </Grid>
          <Typography className={classes.description}>
            {book.description}
          </Typography>
        </Paper>
      </Collapse>
      <Grid container justify='center' className={classes.switch}>
        { reqHeight > 195 && (
            <FormControlLabel
              control={<Switch checked={open} onChange={toggleOpen} />}
              label={ open ? 'Close' : 'Open' }
            />
        )}
      </Grid>
    </Box>
  );
}

export default BookShow;
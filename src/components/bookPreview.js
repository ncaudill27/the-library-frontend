import React from "react"

import { Link, Typography, makeStyles, Box, Grid } from "@material-ui/core"
import BookSelect from "./bookSelect"

const BookPreview = ({
  src,
  title,
  author,
  description,
  toggleShowing,
  clubsCurrentUserIsMod,
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container direction="row" spacing={1} justify="center">
        <Grid className={classes.image} item xs={3}>
          <img
            className={classes.img}
            src={src}
            alt={"Cover art for " + title}
          />
        </Grid>
        <Grid item xs={9}>
          <Link className={classes.link} onClick={toggleShowing}>
            <Typography variant="h5">{title}</Typography>
          </Link>
          <Typography variant="h5">By: {author}</Typography>
          <Typography>{description}</Typography>
        </Grid>
      </Grid>
      <BookSelect title={title} clubsCurrentUserIsMod={clubsCurrentUserIsMod} />
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.dark,
  },
  image: {
    height: "auto",
    width: "100px",
    float: "left",
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
    float: "left",
  },
}))

export default BookPreview

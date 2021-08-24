import React from "react"
import Star from "./Star"

import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  rating: {
    marginBottom: "6px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.5),
    borderRadius: "3px",
  },
}))

function StarRating({ count }) {
  const classes = useStyles()

  function convertToStars() {
    let rating = []
    for (let i = 0; i < count; i++) {
      rating.push(<Star key={i} />)
    }
    return rating
  }

  return count ? (
    <Grid
      className={classes.rating}
      container
      justify="center"
      alignItems="flex-end"
    >
      {convertToStars()}
    </Grid>
  ) : null
}

export default StarRating

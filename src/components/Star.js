import React from "react"
import star from "../star.png"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  star: {
    marginTop: theme.spacing(0.5),
    height: "20px",
    width: "auto",
  },
}))
const Star = () => {
  const classes = useStyles()

  return (
    <Grid item>
      <img className={classes.star} src={star} alt="star" />
    </Grid>
  )
}

export default Star

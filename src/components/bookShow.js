import React from "react"
import StarRating from "./StarRating"
/* ----------
  Material imports
----------- */
import {
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Paper,
  Box,
  Collapse,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const BookShow = React.forwardRef(
  (
    {
      hide,
      open,
      title,
      authors,
      refHeight,
      toggleOpen,
      imageLinks,
      description,
      averageRating,
    },
    ref
  ) => {
    const classes = useStyles()

    return (
      <Box className={classes.root} onClick={hide}>
        <Paper elevation={3}>
          <Typography variant="h5" align="center" className={classes.title}>
            {title}
          </Typography>
        </Paper>
        <Collapse in={open} collapsedHeight={320}>
          <Paper elevation={1} className={classes.paper} square ref={ref}>
            <Grid
              className={classes.details}
              xs={6}
              item
              container
              direction="column"
              spacing={0}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <img
                  className={classes.img}
                  src={imageLinks ? imageLinks.thumbnail : ""}
                  alt={title + " Cover Art"}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  Author{authors.length <= 1 ? "" : "s"}:{" "}
                  {[...authors].join(", ")}
                </Typography>
              </Grid>
              <Grid item>
                <StarRating count={averageRating} />
              </Grid>
            </Grid>
            <Typography className={classes.description}>
              {description}
            </Typography>
          </Paper>
        </Collapse>
        <Grid container justify="center" className={classes.switch}>
          {refHeight > 195 && (
            <FormControlLabel
              control={<Switch checked={open} onChange={toggleOpen} />}
              label={open ? "Close" : "Open"}
            />
          )}
        </Grid>
      </Box>
    )
  }
)

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(-1),
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "500",
    paddingTop: theme.spacing(1),
    height: "100%",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#f0f0f0",
    overflow: "auto",
  },
  details: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),

    float: "right",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  description: {
    textAlign: "justify",
  },
  switch: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    marginBottom: theme.spacing(3),
  },
}))

export default BookShow

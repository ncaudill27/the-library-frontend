export const apiEnvironment = slug => {
  if (process.env.NODE_ENV === "development") {
    return slug
  } else {
    return process.env.REACT_APP_HEROKU_API + slug
  }
}

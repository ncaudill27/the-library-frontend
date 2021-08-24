import React from "react"
import { TextField } from "@material-ui/core"

const Input = ({ name, value, handleChange }) => {
  // parseName will convert JS namespaced variables into user friendly text.
  const parseName = () => {
    // Here it checks for camelCase
    if (/[A-Z]/.test(name)) {
      const upper = name.match(/[A-Z]/) // Saves the capital letter here
      //     Capitalize first letter      // Add a space before previously saved capital letter and join
      return (
        name.charAt(0).toUpperCase() +
        name.slice(1).replace(upper[0], " " + upper[0])
      )
      // If not camelCase
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1) // Capitalize first letter & join
    }
  }

  switch (name) {
    case "password":
    case "confirmPassword":
      return (
        <TextField
          label={parseName()}
          name={name}
          variant="outlined"
          type="password"
          onChange={handleChange}
          value={value}
          autoComplete="off"
        />
      )

    case "description":
    case "bio":
      return (
        <TextField
          label={parseName()}
          variant="outlined"
          multiline
          name={name}
          rows="4"
          onChange={handleChange}
          value={value}
        />
      )

    default:
      return (
        <TextField
          label={parseName()}
          variant="outlined"
          name={name}
          type="text"
          onChange={handleChange}
          value={value}
          autoComplete="off"
        />
      )
  }
}

export default Input

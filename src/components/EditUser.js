import React, { Component } from "react"
import { Redirect, NavLink } from "react-router-dom"
import FormField from "./FormField"
import { connect } from "react-redux"
import { updateUserRequest } from "../actions/users"

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.currentUser.name,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      bio: this.props.currentUser.bio,
      redirect: null,
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  editUser = e => {
    const updatedInfo = (({ name, username, email, bio }) => ({
      name,
      username,
      email,
      bio,
    }))(this.state)
    const id = this.props.currentUser.id
    console.log(updatedInfo, id)

    e.preventDefault()

    this.props.updateUserRequest({ user: updatedInfo }, id)
    this.setState({ redirect: true })
  }

  renderEditForm = () => {
    const { name, username, email, bio } = this.state
    const inputValues = { 0: name, 1: username, 2: email, 3: bio }
    const inputNames = { 0: "name", 1: "username", 2: "email", 3: "bio" }

    return (
      <>
        <FormField
          handleChange={this.handleChange}
          handleSubmit={this.editUser}
          inputNames={inputNames}
          inputValues={inputValues}
          submitValue="Update"
        />
        <button onClick={() => this.setState({ redirect: true })}>
          Cancel
        </button>
      </>
    )
  }

  render() {
    const {
      currentUser,
      currentUser: { username },
    } = this.props

    if (this.state.redirect) return <Redirect to={`/${username}`} />
    return (
      <div className="Edit">
        <h2>Edit User</h2>
        <NavLink to="/avatar-selection" exact className="Navlink">
          Choose New Avatar
        </NavLink>
        {!!currentUser && this.state.bio !== false
          ? this.renderEditForm()
          : null}
      </div>
    )
  }
}

export default connect(null, { updateUserRequest })(EditUser)

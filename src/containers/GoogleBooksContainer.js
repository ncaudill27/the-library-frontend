import React, { Component } from "react"

class GoogleBooksContainer extends Component {
  fetchBooks() {
    const google_key = process.env.REACT_APP_GOOGLE_BOOKS_KEY
    const isbn = "9780525521143".replace(/-/g, "")
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${google_key}`
    )
      .then(resp => resp.json())
      .then(list => console.log(list))
  }

  render() {
    return (
      <div>
        GoogleBooksContainer
        {this.fetchBooks()}
      </div>
    )
  }
}

export default GoogleBooksContainer

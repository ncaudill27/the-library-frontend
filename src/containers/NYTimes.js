import React, { Component } from "react"
import Book from "../components/Book"
/* ------------
  Material imports
------------ */
import {
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core"

const { REACT_APP_NY_TIMES_KEY } = process.env

const useStyles = makeStyles(theme => ({
  menuItem: {
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: theme.spacing(0.25),
  },
}))

const SelectCategory = ({ options, handleSelectChange, select }) => {
  const classes = useStyles()

  const selectOptions = () => {
    return options.map((cat, idx) => (
      <MenuItem
        key={idx}
        value={cat.replace(/\s/g, "-").toLowerCase()}
        className={classes.menuItem}
      >
        {cat}
      </MenuItem>
    ))
  }

  return (
    <FormControl>
      <InputLabel id="bestsellers-categories">Categories</InputLabel>
      <Select onChange={handleSelectChange} value={select} className="select">
        {selectOptions()}
      </Select>
    </FormControl>
  )
}

class NYTimes extends Component {
  state = {
    select: "hardcover-fiction",
    books: [],
    options: [],
  }

  async componentDidMount() {
    let options = await this.fetchOptions()
    options = [...new Set(options)]
    this.setState({ options })
    this.fetchBestSellers()
  }

  fetchBestSellers = () => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${this.state.select}.json?api-key=` +
        REACT_APP_NY_TIMES_KEY
    )
      .then(res => res.json())
      .then(list =>
        this.setState({
          books: list.results.books,
        })
      )
  }

  fetchOptions() {
    return fetch(
      "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=" +
        REACT_APP_NY_TIMES_KEY
    )
      .then(res => res.json())
      .then(list => list.results.map(type => type.list_name))
  }

  renderBooks = () => {
    return this.state.books.map(book => {
      const title = book.title.replace(
        /\b[A-Z]+\b/g,
        x => x.charAt(0) + x.slice(1).toLowerCase()
      )

      return (
        <Book
          key={book.primary_isbn13}
          title={title}
          author={book.author}
          publisher={book.publisher}
          description={book.description}
          src={book.book_image}
          amazonUrl={book.amazon_product_url}
          isbn10={book.primary_isbn10}
          isbn13={book.primary_isbn13}
          clubsCurrentUserMods={this.props.clubsCurrentUserMods}
        />
      )
    })
  }

  handleSelectChange = e => {
    localStorage.setItem("NYSelector", e.target.value)
    this.setState(
      {
        select: e.target.value,
      },
      this.fetchBestSellers
    )
  }

  render() {
    return (
      <>
        <Typography variant="h3">New York Times Best Sellers</Typography>
        <SelectCategory
          select={this.state.select}
          options={this.state.options}
          handleSelectChange={this.handleSelectChange}
        />
        {this.renderBooks()}
      </>
    )
  }
}

export default NYTimes

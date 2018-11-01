import React from 'react'
import Search from './Search'
import Shelf from './Shelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

const shelves = [{ shelf: 'currentlyReading' }, { shelf: 'wantToRead' }, { shelf: 'read' }];

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.log('books', books)
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((shelf, index) => (
                  <Shelf 
                    key={index}
                    shelf={shelf} 
                    books={books}
                    shelves={shelves}>
                  </Shelf>
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <Search />
        )} />
      </div>
    )
  }
}

export default BooksApp

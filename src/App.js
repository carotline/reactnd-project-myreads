import React from 'react'
import Search from './Search'
import Shelf from './Shelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

const shelves = [
  { shelf: 'currentlyReading' }, 
  { shelf: 'wantToRead' }, 
  { shelf: 'read' }
];

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        const {
          books
        } = Object.assign({}, this.state);
        if(!!book.shelf) {
          for(let i = 0; i < books.length; i++) {
            if(books[i].id === book.id) {
              books[i].shelf = shelf;
              break;
            }
          }
        } else {
          book.shelf = shelf;
          books.push(book);
        }
        
        this.setState({
          ...this.state,
          books: books
        })
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
                    handleShelf={this.changeShelf}>
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
          <Search handleShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp

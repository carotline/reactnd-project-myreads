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
    //Get all books before it rerender
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({
                books
            }))
        })
    }
    changeShelf = (book, shelf) => {
        //Update shelf with APi
        BooksAPI.update(book, shelf)
        .then(() => {
            this.setState( prevState => {
                const newBooks = [...prevState.books]
                //If no shelf add new one or none
                if(!book.shelf || book.shelf === "none") {
                    book.shelf = shelf;
                    newBooks.push(book);
                } else {
                  //If shelf exist change with new one
                    for(let i = 0; i < newBooks.length; i++) {
                        if(newBooks[i].id === book.id) {
                            newBooks[i].shelf = shelf
                            break;
                        }
                    }
                }
                return { books: newBooks }
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
                                    //Render different Shelf
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
                    <Search 
                        handleShelf={this.changeShelf}
                        selectedBooks={books}
                     />
                )} />
            </div>
        )
    }
}

export default BooksApp

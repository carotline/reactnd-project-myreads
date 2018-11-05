import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends React.Component {
    static propTypes = {
        handleShelf: PropTypes.func.isRequired,
    }
    state = {
        query: '',
        resultBooks: []
    }
    updateQuery = (event) => {
        const query = event.target.value
        this.setState(() => ({
            query: query
        }))
        if (query.length > 0) {
            this.fetchData(query)
        } else {
          this.resultBooks = []
        }
    }
    fetchData = (query) => {
        BooksAPI.search(query)
        .then((books) => {
            const { selectedBooks } = this.props
            if (books.length > 0) { 
                this.addShelf(selectedBooks, books)
            } else {
              books = []
            }
            this.setState(() => ({
                resultBooks: books
            }))
        });  
    }
    addShelf = (selectedBooks, books) => {
        books.forEach((b1) => {
          b1.shelf = "none";
          for(let i = 0; i < selectedBooks.length; i++) {
              if(b1.id === selectedBooks[i].id) {
                  b1.shelf = selectedBooks[i].shelf;
                  break;
              }
          }
      });
    }
    render() {
        const { query, resultBooks  } = this.state
        const { handleShelf } = this.props
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                          type="text" 
                          placeholder="Search by title or author"
                          value={query}
                          onChange={this.updateQuery}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {resultBooks.length > 0 && query !== '' && resultBooks.map(function (book, index) {  // map the new array to list items
                            return <Book 
                                      key={index} 
                                      book={book} 
                                      handleShelf={handleShelf}>
                                    </Book>
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search
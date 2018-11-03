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
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        if (query.length > 0) {
            this.fetchData(query)
        }
    }
    fetchData = (query) => {
        BooksAPI.search(query)
        .then((books) => {
            this.setState(() => ({
                resultBooks: books
            }))
        })  
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
                          onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {resultBooks.length > 0 && query !== '' && resultBooks.map(function (book, index) {  // map the new array to list items
                            return <Book key={index} book={book} handleShelf={handleShelf}></Book>
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search
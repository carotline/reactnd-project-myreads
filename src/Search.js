import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
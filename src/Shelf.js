import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

function Shelf (props) {
    const { shelf, books, handleShelf } = props;
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(function (book) { // filter first for shelf
                        return shelf.shelf === book.shelf // returns a new array
                    }).map(function (book, index) {  // map the new array to list items
                        return <Book key={index} book={book} handleShelf={handleShelf}></Book>
                    })}
                </ol>
            </div>
        </div>
    );
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    handleShelf: PropTypes.func.isRequired,
    shelf: propTypes.string.isRequired
};

export default Shelf
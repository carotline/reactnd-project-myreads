import React from 'react'
import Book from './Book'

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

export default Shelf
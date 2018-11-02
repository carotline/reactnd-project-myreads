import React from 'react'
import Book from './Book'

class Shelf extends React.Component { 
    render() {
        const { shelf, books } = this.props;
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(function (book) { // filter first for shelf
                            return shelf.shelf === book.shelf // returns a new array
                        }).map(function (book, index) {  // map the new array to list items
                            return <Book key={index} book={book}></Book>
                        })}
                    </ol>
                </div>
            </div>
        );
    }

}

export default Shelf
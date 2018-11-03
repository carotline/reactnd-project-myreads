import React from 'react'
import ShelfChanger from './ShelfChanger'


class Book extends React.Component {
    handleShelf = shelf => {
        const {book} = this.props;
        //The callback is getting called.
        this.props.handleShelf(book, shelf);
    }; 
    render() {        
        const {book} = this.props;
        return(
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <ShelfChanger shelf={book.shelf} handleShelf={this.handleShelf}/>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {!!book.authors && book.authors.map( (author, index) => <div key={index}>{author}</div>)}
              </div>
            </div>
          </li>
        );
    }
}

export default Book;
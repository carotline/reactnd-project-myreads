import React from 'react'
import ShelfChanger from './ShelfChanger'
import PropTypes from 'prop-types'

class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        handleShelf: PropTypes.func.isRequired,
    }
    handleShelf = shelf => {
        const {book} = this.props;
        //The callback is getting called.
        this.props.handleShelf(book, shelf);
    }; 
    render() {
        const {book} = this.props;
        //Verify if book image exist
        const picBook = !!book.imageLinks && !!book.imageLinks.smallThumbnail  ? book.imageLinks.smallThumbnail : "" 
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div 
                            className="book-cover" 
                            style={{ width: 128, height: 193, backgroundImage: `url(${picBook})` }}>
                        </div>
                        <ShelfChanger 
                            shelf={book.shelf} 
                            handleShelf={this.handleShelf}/>
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
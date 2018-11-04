import React from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends React.Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        handleShelf: PropTypes.func.isRequired,
    }
    handleChange = (event) => {
        //Reverse flow to handle changes
        this.props.handleShelf(event.target.value)
    }
    render() {
        const selectedOption = this.props.shelf
        return(
            <div className="book-shelf-changer">
                <select value={selectedOption} onChange={this.handleChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
          </div>
        );
    }
}

export default ShelfChanger


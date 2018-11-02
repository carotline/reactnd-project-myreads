import React from 'react'

class ShelfChanger extends React.Component { 
    state = {
        selectedOption: this.props.shelf
      }
      handleChange = (event) => {
          console.log(event.target.value);
      }
    render() {
        const { selectedOption } = this.state;
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


import React from 'react'
import PropTypes from 'prop-types'
import './SearchBar.css';

function SearchBar(props) {
    const { type, searchInput} = props;

    return (
       <>
            <input 
                className='searchBar'
                placeholder={`Search by ${type}`}
                onChange={(event) => {
                    searchInput(event.target.value.toLowerCase().trim());
                }}
            />
       </>
    );
}
SearchBar.propTypes = {
    type: PropTypes.string.isRequired,
    searchInput: PropTypes.func.isRequired,
};

export default SearchBar;

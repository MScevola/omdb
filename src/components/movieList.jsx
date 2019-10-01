import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const List = styled.ul`
    position: relative;
    display: block;
    padding: 20px 10px;
    margin: 0;
    list-style: none;
    text-align: center;

    li{
        position: relative;
        display: inline-block;
        width: 30%;
        max-width: 105px;
        vertical-align: top;
        padding: 5px;
    }
`

const MovieList = ({children}) => {
    return(
        <List data-test='movie-list'>{children}</List>
    )
}

MovieList.propTypes = {
    children: PropTypes.string.isRequired
}

export default MovieList;

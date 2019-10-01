import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import iconFavorite from '../assets/icon-favorite.svg';
import iconIsFavorite from '../assets/icon-is-favorite.svg';

const Button = styled.button`
    position: relative;
    display: block;
    background: none;
    border: none;
    
    &:focus{
        outline: none
    }
`

const FavoriteButton = ({ onClick, isFavorite, className }) => {

    return(
        <Button className={className} onClick={ () => onClick() } data-test='favorite-button'>
            { isFavorite ? <img src={iconIsFavorite} alt="favorite button" data-test='is-favorite'/> : <img src={iconFavorite} alt="favorite button" data-test='not-favorite'/> }
        </Button>
    )
}

FavoriteButton.propTypes = {
    onClick: PropTypes.func
}

export default FavoriteButton;

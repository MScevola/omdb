import React from 'react';
import styled from 'styled-components';

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
        <Button className={className} onClick={ () => onClick() }>
            { isFavorite ? <img src={iconIsFavorite} alt="favorite button"/> : <img src={iconFavorite} alt="favorite button"/> }
        </Button>
    )
}

export default FavoriteButton;

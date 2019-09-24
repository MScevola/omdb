import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import profileIcon from '../assets/icon-profile.png';
import searchIcon from '../assets/icon-search.png';
import favoriteIcon from '../assets/icon-favorite.png';

const Container = styled.nav`
    position: fixed;
    display: block;
    width: 100vw;
    height: 80px;
    left: 0;
    bottom: 0;
    background: #2c5871;

    ul{
        position: relative;
        display: flex;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        max-width: 600px;
        padding: 0;
        list-style: none;
        justify-content: space-around;
        align-items: center;
    }
`

const TabBar = () => {
    return(
        <Container>
            <ul>
                <li><Link to='/'><img src={searchIcon} alt="home"/></Link></li>
                <li><Link to='/favorites'><img src={favoriteIcon} alt="favorites"/></Link></li>
                <li><Link to='/logar'><img src={profileIcon} alt="logar"/></Link></li>
            </ul>
        </Container>
    )
}

export default TabBar;
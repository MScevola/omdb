import React from 'react';
import styled from 'styled-components';

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
        width: 105px;
        vertical-align: top;
        padding: 5px;
    }
`

const MovieList = ({children}) => {
    return(
        <List>{children}</List>
    )
}

export { MovieList };

import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.label`
    position: relative;
    display: block;
    max-width: 600px;
    margin: 0;
    padding: 5px 10px;
    border-radius: 14px;
    background: white;

    button{
        position: relative;
        display: block;
        color: #424a60;

        &:focus{
            outline: none;
        }
    }
`

const CloseButton = ({onClick}) => {
    return(
        <ButtonContainer>
            <button onClick={onClick}>Close</button>
        </ButtonContainer>
    )
}

export default CloseButton;

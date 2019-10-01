import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
        background: none;
        border: none;

        &:focus{
            outline: none;
        }
    }
`

const CloseButton = ({onClick}) => {
    return(
        <ButtonContainer data-test='close-button'>
            <button onClick={onClick}>Close</button>
        </ButtonContainer>
    )
}

CloseButton.propTypes = {
    onClick: PropTypes.func
}

export default CloseButton;

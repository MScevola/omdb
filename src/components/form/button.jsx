import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = styled.label`
    position: relative;
    display: block;
    max-width: 600px;
    margin: 20px auto;

    button{
        position: relative;
        display: block;
        width: 100%;
        background: #25ae88;
        color: white;
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 14px;
        box-sizing: border-box;
        border: none;

        &:focus{
            outline: none;
        }
    }
`

const Button = ({children, onClick}) => {
    return(
        <ButtonContainer data-test='button'>
            <button onClick={onClick}>{children}</button>
        </ButtonContainer>
    )
}

Button.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;

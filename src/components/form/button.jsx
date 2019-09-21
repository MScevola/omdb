import React from 'react';
import styled from 'styled-components';

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
        <ButtonContainer>
            <button onClick={onClick}>{children}</button>
        </ButtonContainer>
    )
}

export default Button;
